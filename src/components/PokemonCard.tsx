import Link from 'next/link';
import Image from 'next/image'
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
        <Image
            src={pokemon.image}
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            alt={pokemon.name}
            width={210}
            height={210}
            style={{
              width: "auto" || 210,
              height: "auto" || 210
            }}
        />
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
