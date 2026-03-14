export interface Pokemon {
	id: number
	name: string
	types: string[]
	sprite: string
	stats: {
		hp: number
		attack: number
		defense: number
		speed: number
	}
	height: number
	weight: number
}

export const typeColors: Record<string, string> = {
	normal: 'bg-stone-400',
	fire: 'bg-orange-500',
	water: 'bg-blue-500',
	electric: 'bg-yellow-400',
	grass: 'bg-green-500',
	ice: 'bg-cyan-400',
	fighting: 'bg-red-600',
	poison: 'bg-fuchsia-500',
	ground: 'bg-amber-600',
	flying: 'bg-indigo-400',
	psychic: 'bg-pink-500',
	bug: 'bg-lime-500',
	rock: 'bg-stone-600',
	ghost: 'bg-indigo-600',
	dragon: 'bg-indigo-700',
	dark: 'bg-stone-700',
	steel: 'bg-slate-400',
	fairy: 'bg-pink-400',
}

export const typeGradients: Record<string, string> = {
	normal: 'from-stone-400/20 to-stone-600/10',
	fire: 'from-orange-500/20 to-red-600/10',
	water: 'from-blue-500/20 to-blue-700/10',
	electric: 'from-yellow-400/20 to-amber-500/10',
	grass: 'from-green-500/20 to-emerald-600/10',
	ice: 'from-cyan-400/20 to-blue-400/10',
	fighting: 'from-red-600/20 to-red-800/10',
	poison: 'from-fuchsia-500/20 to-purple-600/10',
	ground: 'from-amber-600/20 to-orange-700/10',
	flying: 'from-indigo-400/20 to-blue-500/10',
	psychic: 'from-pink-500/20 to-fuchsia-600/10',
	bug: 'from-lime-500/20 to-green-600/10',
	rock: 'from-stone-500/20 to-stone-700/10',
	ghost: 'from-indigo-600/20 to-purple-800/10',
	dragon: 'from-indigo-700/20 to-violet-800/10',
	dark: 'from-stone-700/20 to-stone-900/10',
	steel: 'from-slate-400/20 to-slate-600/10',
	fairy: 'from-pink-400/20 to-pink-600/10',
}

export async function fetchPokemonList(limit = 50, offset = 0): Promise<Pokemon[]> {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
	)
	const data = await response.json()

	const pokemonPromises = data.results.map(async (pokemon: { url: string }) => {
		const detailResponse = await fetch(pokemon.url)
		const detail = await detailResponse.json()

		return {
			id: detail.id,
			name: detail.name,
			types: detail.types.map((t: { type: { name: string } }) => t.type.name),
			sprite: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
			stats: {
				hp: detail.stats[0].base_stat,
				attack: detail.stats[1].base_stat,
				defense: detail.stats[2].base_stat,
				speed: detail.stats[5].base_stat,
			},
			height: detail.height / 10,
			weight: detail.weight / 10,
		}
	})

	return Promise.all(pokemonPromises)
}

export async function fetchPokemonByType(
	type: string,
	limit = 50,
	offset = 0
): Promise<{ pokemon: Pokemon[]; total: number }> {
	const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
	const data = await response.json()

	const total = data.pokemon.length
	const slicedPokemon = data.pokemon.slice(offset, offset + limit)

	const pokemonPromises = slicedPokemon.map(
		async (p: { pokemon: { name: string; url: string } }) => {
			const detailResponse = await fetch(p.pokemon.url)
			const detail = await detailResponse.json()

			return {
				id: detail.id,
				name: detail.name,
				types: detail.types.map((t: { type: { name: string } }) => t.type.name),
				sprite:
					detail.sprites.other['official-artwork'].front_default ||
					detail.sprites.front_default,
				stats: {
					hp: detail.stats[0].base_stat,
					attack: detail.stats[1].base_stat,
					defense: detail.stats[2].base_stat,
					speed: detail.stats[5].base_stat,
				},
				height: detail.height / 10,
				weight: detail.weight / 10,
			}
		}
	)

	const pokemon = await Promise.all(pokemonPromises)
	return { pokemon, total }
}

export async function searchPokemonByName(query: string): Promise<Pokemon | null> {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`
		)
		if (!response.ok) return null
		const detail = await response.json()

		return {
			id: detail.id,
			name: detail.name,
			types: detail.types.map((t: { type: { name: string } }) => t.type.name),
			sprite:
				detail.sprites.other['official-artwork'].front_default ||
				detail.sprites.front_default,
			stats: {
				hp: detail.stats[0].base_stat,
				attack: detail.stats[1].base_stat,
				defense: detail.stats[2].base_stat,
				speed: detail.stats[5].base_stat,
			},
			height: detail.height / 10,
			weight: detail.weight / 10,
		}
	} catch {
		return null
	}
}

export async function fetchPokemonById(id: number): Promise<Pokemon | null> {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		if (!response.ok) return null
		const detail = await response.json()

		return {
			id: detail.id,
			name: detail.name,
			types: detail.types.map((t: { type: { name: string } }) => t.type.name),
			sprite: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
			stats: {
				hp: detail.stats[0].base_stat,
				attack: detail.stats[1].base_stat,
				defense: detail.stats[2].base_stat,
				speed: detail.stats[5].base_stat,
			},
			height: detail.height / 10,
			weight: detail.weight / 10,
		}
	} catch {
		return null
	}
}
