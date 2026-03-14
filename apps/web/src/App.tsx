import { fetchPokemonByType, fetchPokemonList, searchPokemonByName, type Pokemon } from "@workspace/ui/lib/api"
import { useEffect, useState } from "react"
import { SearchBar } from "./components/search-bar"
import { TypeFilter } from "./components/type-filter"
import { Loader2 } from "lucide-react"
import { PokemonCard } from "./components/pokemon-card"
import { PokemonDetail } from "./components/pokemon-detail"

export function App() {
	const [pokemon, setPokemon] = useState<Pokemon[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const [typeFilter, setTypeFilter] = useState('all')
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
	const [loadingMore, setLoadingMore] = useState(false)
	const [offset, setOffset] = useState(0)
	const [hasMore, setHasMore] = useState(true)
	const [totalByType, setTotalByType] = useState(0)
	const [searchResult, setSearchResult] = useState<Pokemon | null>(null)
	const [searching, setSearching] = useState(false)
	const [searchError, setSearchError] = useState(false)

	useEffect(() => {
		async function loadPokemon() {
			setLoading(true)
			setPokemon([])
			setOffset(0)
			try {
				if (typeFilter === 'all') {
					const data = await fetchPokemonList(50, 0)
					setPokemon(data)
					setOffset(50)
					setHasMore(data.length === 50)
					setTotalByType(0)
				} else {
					const { pokemon: data, total } = await fetchPokemonByType(typeFilter, 50, 0)
					setPokemon(data)
					setOffset(50)
					setTotalByType(total)
					setHasMore(50 < total)
				}
			} catch (error) {
				console.error('Erro ao carregar Pokémon:', error)
			} finally {
				setLoading(false)
			}
		}
		loadPokemon()
	}, [typeFilter])

	const loadMore = async () => {
		if (loadingMore || !hasMore) return
		setLoadingMore(true)
		try {
			if (typeFilter === 'all') {
				const data = await fetchPokemonList(50, offset)
				setPokemon((prev) => [...prev, ...data])
				setOffset((prev) => prev + 50)
				setHasMore(data.length === 50)
			} else {
				const { pokemon: data, total } = await fetchPokemonByType(typeFilter, 50, offset)
				setPokemon((prev) => [...prev, ...data])
				setOffset((prev) => prev + 50)
				setHasMore(offset + 50 < total)
			}
		} catch (error) {
			console.error('Erro ao carregar mais Pokémon:', error)
		} finally {
			setLoadingMore(false)
		}
	}

	useEffect(() => {
		const searchPokemon = async () => {
			if (!search.trim()) {
				setSearchResult(null)
				setSearchError(false)
				return
			}

			setSearching(true)
			setSearchError(false)

			try {
				const result = await searchPokemonByName(search)
				setSearchResult(result)
				setSearchError(!result)
			} catch {
				setSearchResult(null)
				setSearchError(true)
			} finally {
				setSearching(false)
			}
		}

		const debounce = setTimeout(searchPokemon, 500)
		return () => clearTimeout(debounce)
	}, [search])

	const displayPokemon = search.trim() ? (searchResult ? [searchResult] : []) : pokemon
	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
				<div className="mx-auto max-w-lg px-4 py-4">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								className="h-6 w-6 text-primary-foreground"
							>
								<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
								<line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
								<circle cx="12" cy="12" r="4" fill="currentColor" />
								<circle cx="12" cy="12" r="2" fill="oklch(0.13 0.01 260)" />
							</svg>
						</div>
						<div>
							<h1 className="text-xl font-bold text-foreground">Pokédex</h1>
							<p className="text-xl text-muted-foreground">
								{pokemon.length}
								{typeFilter != "all" && totalByType > 0
									? ` de ${totalByType} ${typeFilter}`
									: ""}{" "}
								Pokémom carregados
							</p>
						</div>
					</div>
					<SearchBar value={search} onChange={setSearch} />
				</div>
				<div className="mx-auto max-w-lg px-4 pb-4">
					<TypeFilter selected={typeFilter} onSelect={setTypeFilter} />
				</div>
			</header>

			<main className="mx-auto max-w-lg px-4 py-6">
				{loading || searching ? (
					<div className="flex flex-col items-center justify-center py-20">
						<Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
						<p className="mt-4 text-muted-foreground">
							{searching ? "Buscando Pokémon..." : "Carregando Pokémon..."}
						</p>
					</div>
				) :
					displayPokemon.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20">
							<div className="mb-4 rounded-full bg-secondary p-6">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									className="h-12 w-12 text-muted-foreground"
								>
									<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
									<line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
									<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
								</svg>
							</div>
							<p className="text-lg font-medium text-foreground">
								{searchError ? "Nenhum Pokémon encontrado com esse nome." : "Nenhum Pokémon encontrado."}
							</p>
							<p className="text-sm text-muted-foreground ">
								{searchError ? "Tente verificar a grafia ou buscar por um nome diferente." : "Tente ajustar os filtros ou buscar por um nome específico."}
							</p>
						</div>
					) : (
						<>
							<div className="grid grid-cols-2 gap-4">
								{displayPokemon.map((p) => (
									<PokemonCard
										key={p.id}
										pokemon={p}
										onClick={() => setSelectedPokemon(p)}
									/>
								))}
							</div>

							{hasMore && !search.trim() && (
								<div className="mt-8 flex justify-center">
									<button
										className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
										onClick={loadMore}
										disabled={loadingMore}
									>
										{loadingMore ? (
											<>
												<Loader2 className="h-5 w-5 animate-spin" />
												<span>Carregando...</span>
											</>
										) : (
											<span>Carregar mais</span>
										)}
									</button>
								</div>
							)}
						</>
					)
				}
			</main>
			{selectedPokemon && (
				<PokemonDetail
					pokemon={selectedPokemon}
					onClose={() => setSelectedPokemon(null)}
				/>
			)}
		</div>
	)
}
