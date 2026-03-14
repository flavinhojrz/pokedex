import { type Pokemon, typeGradients, typeColors } from "@workspace/ui/lib/api"
import { cn } from "@workspace/ui/lib/utils"
import { X, Ruler, Weight, Heart, Swords, Shield, Zap } from "lucide-react"

interface PokemonDetailProps {
	pokemon: Pokemon
	onClose: () => void
}

function StatBar({ label, value, maxValue = 150, icon: Icon, color }: {
	label: string
	value: number
	maxValue?: number
	icon: React.ElementType
	color: string
}) {
	const percentage = Math.min((value / maxValue) * 100, 100)

	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between text-sm">
				<div className="flex items-center gap-2 text-muted-foreground">
					<Icon className="h-4 w-4" />
					<span>{label}</span>
				</div>
				<span className="font-semibold text-foreground">{value}</span>
			</div>
			<div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
				<div
					className={cn('h-full rounded-full transition-all duration-500', color)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	)
}

export function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
	const primaryType = pokemon.types[0]

	return (
		<div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center">
			<div
				className={cn(
					'relative w-full max-w-md overflow-hidden rounded-t-3xl bg-card sm:rounded-3xl',
					'max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300',
					'border border-border/50 shadow-2xl'
				)}
			>
				<div className={cn(
					'relative bg-linear-to-br p-6 pb-20',
					typeGradients[primaryType] || 'from-muted/20 to-muted/10'
				)}>
					<button
						onClick={onClose}
						className="absolute right-4 top-4 rounded-full bg-secondary/80 p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
					>
						<X className="h-5 w-5" />
					</button>

					<p className="text-sm font-medium text-muted-foreground">
						#{String(pokemon.id).padStart(3, '0')}
					</p>

					<h2 className="mt-1 text-2xl font-bold capitalize text-foreground">
						{pokemon.name}
					</h2>

					<div className="mt-3 flex gap-2">
						{pokemon.types.map((type) => (
							<span
								key={type}
								className={cn(
									'rounded-full px-3 py-1 text-xs font-medium capitalize text-foreground',
									typeColors[type] || 'bg-muted'
								)}
							>
								{type}
							</span>
						))}
					</div>
				</div>

				<div className="relative -mt-16 px-6 pb-6">
					<div className="relative mx-auto mb-6 h-40 w-40">
						<img
							src={pokemon.sprite}
							alt={pokemon.name}
							className="object-contain drop-shadow-2xl"
							sizes="160px"
						/>
					</div>

					<div className="mb-6 grid grid-cols-2 gap-4">
						<div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
							<div className="rounded-full bg-primary/10 p-2">
								<Ruler className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Altura</p>
								<p className="font-semibold text-foreground">{pokemon.height} m</p>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
							<div className="rounded-full bg-primary/10 p-2">
								<Weight className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Peso</p>
								<p className="font-semibold text-foreground">{pokemon.weight} kg</p>
							</div>
						</div>
					</div>

					<div>
						<h3 className="mb-4 text-lg font-semibold text-foreground">Estatísticas Base</h3>
						<div className="space-y-4">
							<StatBar label="HP" value={pokemon.stats.hp} icon={Heart} color="bg-red-500" />
							<StatBar label="Ataque" value={pokemon.stats.attack} icon={Swords} color="bg-orange-500" />
							<StatBar label="Defesa" value={pokemon.stats.defense} icon={Shield} color="bg-blue-500" />
							<StatBar label="Velocidade" value={pokemon.stats.speed} icon={Zap} color="bg-yellow-500" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
