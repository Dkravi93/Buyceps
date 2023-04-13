import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import EvolutionPopup from "../components/EvolutionPopup";
import Image from 'next/image'
import { initializeApollo } from '@/lib/apolloClient';
interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  height: {
    minimum: string;
    maximum: string;
  };
  weight: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  evolutions: Evolution[];
}

interface Evolution {
  id: string;
  name: string;
  image: string;
}

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

const GET_POKEMON = gql`
  query GetPokemon($id: String!) {
    pokemon(id: $id) {
      id
      number
      name
      image
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      evolutions {
        id
        name
        image
      }
    }
  }
`;

function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const [showEvolutions, setShowEvolutions] = useState(false);
  const { loading, error, data } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON, {
    variables: { id: pokemon.id },
    skip: !showEvolutions,
  });

  if (loading && !pokemon) return <p>Loading...</p>;
  if (error) return <p>Error :;(</p>;

  return (
    <div className="pokemon-details">
      <div className="pokemon-image">
        <Image
          src={pokemon.image}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-info">
        <h2>{pokemon.name}</h2>
        <p>Number: {pokemon.number}</p>
        <p>Height: {pokemon.height.minimum}m - {pokemon.height.maximum}m</p>
        <p>Weight: {pokemon.weight.minimum}kg - {pokemon.weight.maximum}kg</p>
        <p>Classification: {pokemon.classification}</p>
        <p>Type: {pokemon.types.join(', ')}</p>
        <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
        <p>Resistant: {pokemon.resistant.join(', ')}</p>
        <button onClick={() => setShowEvolutions(true)}>Show Evolutions</button>
        {showEvolutions && data && (
          // @ts-ignore
          <EvolutionPopup pokemonId={pokemon.id} evolutions={data.pokemon.evolutions} onClose={() => setShowEvolutions(false)} />
        )}
      </div>
    </div >
  );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_POKEMON,
    variables: {
      id: params.id,
    },
  });
  return {
    props: {
      pokemon: data.pokemon,
    },
  };
}

export async function getStaticPaths() {

  const res = await fetch(`https://graphql-pokemon2.vercel.app/`, {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query GetAllPokemon{ pokemons(first: 151) { id name } }`,
    }),
  });

  const { data } = await res.json();
  const paths = data.pokemons.map((pokemon: { id: string }) => ({
    params: { id: pokemon.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default PokemonDetails;