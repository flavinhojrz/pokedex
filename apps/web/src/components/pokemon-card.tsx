import { typeColors, typeGradients, type Pokemon } from "@workspace/ui/lib/api"
import { cn } from "@workspace/ui/lib/utils"

interface PokemonCardProps {
	pokemon: Pokemon
	onClick: () => void
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
	const primaryType = pokemon.types[0]

	return (
		<button
			onClick={onClick}
			className={cn(
				'relative w-full rounded-2xl p-4 text-left transition-all duration-300',
				'bg-linear-to-br border border-border/50',
				'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10',
				'active:scale-[0.98]',
				typeGradients[primaryType] || 'from-muted/20 to-muted/10'
			)}
		>
			<div className="absolute top-3 right-3 text-5xl font-bold text-foreground/5">
				#{String(pokemon.id).padStart(3, '0')}
			</div>

			<div className="relative z-10">
				<div className="relative mx-auto mb-3 h-24 w-24">
					<img
						src={pokemon.sprite}
						alt={pokemon.name}
						className="object-contain drop-shadow-lg"
						sizes="96px"
					/>
				</div>

				<p className="mb-1 text-xs font-medium text-muted-foreground">
					#{String(pokemon.id).padStart(3, '0')}
				</p>

				<h3 className="mb-2 text-base font-semibold capitalize text-foreground">
					{pokemon.name}
				</h3>

				<div className="flex flex-wrap gap-1.5">
					{pokemon.types.map((type) => (
						<span
							key={type}
							className={cn(
								'rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize text-foreground',
								typeColors[type] || 'bg-muted'
							)}
						>
							{type}
						</span>
					))}
				</div>
			</div>
		</button>
	)
}