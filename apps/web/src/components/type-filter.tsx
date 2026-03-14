import { typeColors } from "@workspace/ui/lib/api"
import { cn } from "@workspace/ui/lib/utils"

const types = [
	'all',
	'fire',
	'water',
	'grass',
	'electric',
	'psychic',
	'ice',
	'dragon',
	'dark',
	'fairy',
	'normal',
	'fighting',
	'flying',
	'poison',
	'ground',
	'rock',
	'bug',
	'ghost',
	'steel',
]

interface TypeFilterProps {
	selected: string
	onSelect: (type: string) => void
}

export function TypeFilter({ selected, onSelect }: TypeFilterProps) {
	return (
		<div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{types.map((type) => (
				<button
					key={type}
					onClick={() => onSelect(type)}
					className={cn(
						'shrink-0 rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-200',
						selected === type
							? type === 'all'
								? 'bg-primary text-primary-foreground'
								: cn(typeColors[type], 'text-foreground')
							: 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
					)}
				>
					{type === 'all' ? 'Todos' : type}
				</button>
			))}
		</div>
	)
}