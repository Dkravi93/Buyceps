import Link from 'next/link';
interface Pokemon {
  id: string;
  image: string;
  name: string;
  number: string;
  types: string[];
}

interface Props {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: Props) {
  
  return (
    <Link href={`/${pokemon.id}`}>
      <div className="pokemon-card">
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>
          #{pokemon.number} {pokemon.name}
        </h3>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`pokemon-type ${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
