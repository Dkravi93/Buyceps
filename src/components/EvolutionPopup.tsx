import { useQuery, QueryResult } from '@apollo/client';
import gql from 'graphql-tag';

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

function EvolutionPopup({ evolutions,pokemonId, onClose }: EvolutionPopupProps) {  
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
          <img src={evolution.image} alt={evolution.name} width={210} height={210} />
          <p>{evolution.name}</p>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default EvolutionPopup;