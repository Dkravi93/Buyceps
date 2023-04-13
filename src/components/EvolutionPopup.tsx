import { useQuery, QueryResult, gql } from '@apollo/client';
import Image from 'next/image'

interface EvolutionPopupProps {
  evolutions: string;
  pokemonId: string;
  onClose: () => void;
}

interface EvolutionData {
  pokemon: {
    evolutions?: {
      id: string;
      name: string;
      image: string;
    }[];
  };
}

interface EvolutionVariables {
  id: string;
}

const GET_POKEMON = gql`
  query GetPokemon($id: String!) {
    pokemon(id: $id) {
      id
      name
      image
      evolutions {
        id
        name
        image
      }
    }
  }
`;

function EvolutionPopup({ evolutions, pokemonId, onClose }: EvolutionPopupProps) {
  const { loading, error, data }: QueryResult<EvolutionData, EvolutionVariables> = useQuery<
    EvolutionData,
    EvolutionVariables
  >(GET_POKEMON, {
    variables: { id: pokemonId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="evolution-popup">
      <h3>Evolutions</h3>
      {data?.pokemon?.evolutions?.map((evolution) => (
        <div key={evolution.id} className="evolution">
          <Image
            src={evolution.image}
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            alt={evolution.name}
            width={210}
            height={210}
          />
          <p>{evolution.name}</p>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default EvolutionPopup;