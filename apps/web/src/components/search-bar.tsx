import { cn } from "@workspace/ui/lib/utils"
import { Search, X } from "lucide-react"

interface SearchProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar Pokémon....." }: SearchProps) {
	return (
		<div className="relative">
			<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
			<input type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className={
					cn(
						'w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-12',
						'text-foreground placeholder:text-muted-foreground',
						'transition-all duration-200',
						'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
					)
				}
			/>
			{value && (
				<button
					className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
					onClick={() => onChange('')}
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	)
}