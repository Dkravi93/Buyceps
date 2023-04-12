import { useQuery, gql } from '@apollo/client';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';

interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
}

interface PokemonsData {
  pokemons: {
    edges: { node: Pokemon }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}

interface PokemonsVars {
  first: number;
  after: string | null;
}

const GET_POKEMONS = gql`
  query GetPokemons($first: Int!, $after: String) {
    pokemons(first: $first, after: $after) {
      edges {
        node {
          id
          number
          name
          image
          types
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

interface HomeProps {
  pokemons: PokemonsData['pokemons'];
}

function Home({ pokemons }: HomeProps) {
  const { loading, error, data } = useQuery<PokemonsData, PokemonsVars>(GET_POKEMONS, {
    variables: { first: 20, after: pokemons?.pageInfo?.endCursor || null },
    skip: !pokemons?.pageInfo?.hasNextPage,
  });

  if (loading && !pokemons) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="pokemon-list">{
        // @ts-ignore
        pokemons.map((node) => (
          <PokemonCard key={node.id} pokemon={node} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
// @ts-ignore
export async function getStaticProps({ params }) {
  const res = await fetch('https://graphql-pokemon2.vercel.app/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query pokemons($first: Int!){
        pokemons(first: $first){
          id
          number
          name
          weight{
            minimum
            maximum
          }
          height{
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
      }
      `,
      variables: {
        first: 20,
        after: null
      },
    }),
  });

  const { data } = await res.json();

  return {
    props: {
      pokemons: data.pokemons,
    },
    revalidate: 60,
  };
}
export default Home;
