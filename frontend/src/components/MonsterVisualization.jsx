import { useEffect, useRef, useState } from 'react'
import './MonsterVisualization.css'

function MonsterVisualization({ heartbeat, isAlive, metrics = {} }) {
    const canvasRef = useRef(null)
    const [selectedMonster, setSelectedMonster] = useState(null)
    const [monsterStates, setMonsterStates] = useState({
        s3: { health: 100, activity: 0, size: 30 },
        lambda: { health: 100, activity: 0, errors: 0 },
        dynamodb: { health: 100, activity: 0, heads: 3 },
        cloudwatch: { health: 100, activity: 0, alertLevel: 0 },
        bedrock: { health: 100, activity: 0, predictions: [] }
    })

    // Update monster states based on metrics
    useEffect(() => {
        if (!metrics) return

        setMonsterStates(prev => ({
            s3: {
                ...prev.s3,
                activity: metrics.s3Events || 0,
                size: 30 + (metrics.s3Size || 0) / 1000000, // Grows with storage
                health: Math.max(0, 100 - (metrics.s3Errors || 0) * 10)
            },
            lambda: {
                ...prev.lambda,
                activity: metrics.lambdaInvocations || 0,
                errors: metrics.lambdaErrors || 0,
                health: Math.max(0, 100 - (metrics.lambdaErrors || 0) * 5)
            },
            dynamodb: {
                ...prev.dynamodb,
                activity: metrics.dynamoReads || 0,
                heads: Math.min(7, 3 + Math.floor((metrics.dynamoWrites || 0) / 10)),
                health: Math.max(0, 100 - (metrics.dynamoThrottles || 0) * 20)
            },
            cloudwatch: {
                ...prev.cloudwatch,
                activity: metrics.totalMetrics || 0,
                alertLevel: metrics.alertLevel || 0,
                health: 100 - (metrics.alertLevel || 0) * 20
            },
            bedrock: {
                ...prev.bedrock,
                activity: metrics.bedrockCalls || 0,
                predictions: metrics.anomalies || [],
                health: metrics.anomalies?.length > 0 ? 70 : 100
            }
        }))
    }, [metrics])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const width = canvas.width
        const height = canvas.height

        // Clear with dark gradient background
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)
        gradient.addColorStop(0, '#1a1a2e')
        gradient.addColorStop(1, '#0a0a0a')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        if (!isAlive) {
            // Draw "dormant" state
            ctx.fillStyle = '#333'
            ctx.font = '24px monospace'
            ctx.textAlign = 'center'
            ctx.fillText('💀 MONSTERS SLEEPING...', width / 2, height / 2)
            return
        }

        const centerX = width / 2
        const centerY = height / 2
        const pulse = Math.sin(heartbeat * 0.1) * 8

        // Draw connection web
        ctx.strokeStyle = 'rgba(74, 85, 104, 0.3)'
        ctx.lineWidth = 2
        const monsters = [
            { id: 's3', name: 'S3 Blob', angle: 0, emoji: '🟢', state: monsterStates.s3 },
            { id: 'lambda', name: 'Lambda Wraith', angle: Math.PI * 0.4, emoji: '👻', state: monsterStates.lambda },
            { id: 'dynamodb', name: 'DynamoDB Hydra', angle: Math.PI * 0.8, emoji: '🐉', state: monsterStates.dynamodb },
            { id: 'cloudwatch', name: 'CloudWatch Eye', angle: Math.PI * 1.2, emoji: '👁️', state: monsterStates.cloudwatch },
            { id: 'bedrock', name: 'Bedrock Oracle', angle: Math.PI * 1.6, emoji: '🔮', state: monsterStates.bedrock }
        ]

        // Draw web connections
        monsters.forEach((m1, i) => {
            monsters.slice(i + 1).forEach(m2 => {
                const x1 = centerX + Math.cos(m1.angle) * 180
                const y1 = centerY + Math.sin(m1.angle) * 180
                const x2 = centerX + Math.cos(m2.angle) * 180
                const y2 = centerY + Math.sin(m2.angle) * 180
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()
            })
        })

        // Draw central core
        const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60 + pulse)
        coreGradient.addColorStop(0, '#00ff88')
        coreGradient.addColorStop(0.5, '#00aa55')
        coreGradient.addColorStop(1, '#004422')
        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, 60 + pulse, 0, Math.PI * 2)
        ctx.fill()

        // Draw monsters
        monsters.forEach(monster => {
            const distance = 180 + (monster.state.activity > 0 ? pulse * 2 : 0)
            const x = centerX + Math.cos(monster.angle) * distance
            const y = centerY + Math.sin(monster.angle) * distance

            // Health-based color
            const healthColor = monster.state.health > 70 ? '#00ff88' :
                monster.state.health > 40 ? '#ffaa00' : '#ff3333'

            // Monster body with glow
            ctx.shadowBlur = 20
            ctx.shadowColor = healthColor
            ctx.fillStyle = healthColor
            ctx.beginPath()

            // Size based on state
            const size = monster.id === 's3' ? monster.state.size :
                monster.id === 'lambda' && monster.state.errors > 0 ? 35 + Math.sin(heartbeat * 0.3) * 5 :
                    30

            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0

            // Connection to center
            ctx.strokeStyle = healthColor
            ctx.lineWidth = 2
            ctx.setLineDash([5, 5])
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(x, y)
            ctx.stroke()
            ctx.setLineDash([])

            // Monster emoji
            ctx.font = '32px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(monster.emoji, x, y)

            // Name label
            ctx.fillStyle = '#fff'
            ctx.font = 'bold 13px monospace'
            ctx.fillText(monster.name, x, y + 55)

            // Activity indicator
            if (monster.state.activity > 0) {
                ctx.fillStyle = '#ffff00'
                ctx.font = '10px monospace'
                ctx.fillText(`⚡${monster.state.activity}`, x, y + 70)
            }

            // Special effects
            if (monster.id === 'dynamodb' && monster.state.heads > 3) {
                ctx.fillStyle = '#ff6b35'
                ctx.font = '10px monospace'
                ctx.fillText(`${monster.state.heads} heads`, x, y - 45)
            }

            if (monster.id === 'bedrock' && monster.state.predictions.length > 0) {
                ctx.fillStyle = '#ff3333'
                ctx.font = '16px monospace'
                ctx.fillText('⚠️', x + 25, y - 25)
            }
        })

        // Draw health bars
        monsters.forEach((monster, i) => {
            const barX = 20
            const barY = 20 + i * 35
            const barWidth = 150
            const barHeight = 20

            // Background
            ctx.fillStyle = '#333'
            ctx.fillRect(barX, barY, barWidth, barHeight)

            // Health fill
            const healthColor = monster.state.health > 70 ? '#00ff88' :
                monster.state.health > 40 ? '#ffaa00' : '#ff3333'
            ctx.fillStyle = healthColor
            ctx.fillRect(barX, barY, (barWidth * monster.state.health) / 100, barHeight)

            // Border
            ctx.strokeStyle = '#666'
            ctx.strokeRect(barX, barY, barWidth, barHeight)

            // Label
            ctx.fillStyle = '#fff'
            ctx.font = '11px monospace'
            ctx.textAlign = 'left'
            ctx.fillText(`${monster.emoji} ${monster.name}: ${Math.round(monster.state.health)}%`, barX + 5, barY + 14)
        })

    }, [heartbeat, isAlive, monsterStates])

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Check if clicked on a monster (simplified hit detection)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        const monsters = [
            { id: 's3', angle: 0 },
            { id: 'lambda', angle: Math.PI * 0.4 },
            { id: 'dynamodb', angle: Math.PI * 0.8 },
            { id: 'cloudwatch', angle: Math.PI * 1.2 },
            { id: 'bedrock', angle: Math.PI * 1.6 }
        ]

        monsters.forEach(monster => {
            const mx = centerX + Math.cos(monster.angle) * 180
            const my = centerY + Math.sin(monster.angle) * 180
            const distance = Math.sqrt((x - mx) ** 2 + (y - my) ** 2)

            if (distance < 40) {
                setSelectedMonster(monster.id)
            }
        })
    }

    return (
        <div className="monster-container">
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleCanvasClick}
                style={{ cursor: 'pointer' }}
            />
            <div className="heartbeat-indicator">
                <span style={{ width: `${heartbeat}%` }}></span>
            </div>
            {selectedMonster && (
                <div className="monster-details">
                    <h3>{selectedMonster.toUpperCase()} Details</h3>
                    <button onClick={() => setSelectedMonster(null)}>✕</button>
                    <pre>{JSON.stringify(monsterStates[selectedMonster], null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default MonsterVisualization
