import { useState, useEffect } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import MovieCard from '../components/MovieCard';
import ErrorMessage from '../components/ErrorMessage';

const MOVIES = [
  { id: '1',  title: 'Inception',
    year: '2010', genre: 'Sci-Fi', director: 'Christopher Nolan', rating: '8.8',
    plot: 'A thief who steals secrets through dreams.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },

  { id: '2',  title: 'The Dark Knight',
    year: '2008', genre: 'Action', director: 'Christopher Nolan', rating: '9.0',
    plot: 'Batman faces the Joker in Gotham City.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },

  { id: '3',  title: 'Interstellar',
    year: '2014', genre: 'Sci-Fi', director: 'Christopher Nolan', rating: '8.6',
    plot: 'Astronauts travel through a wormhole.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },

  { id: '4',  title: 'The Matrix',
    year: '1999', genre: 'Sci-Fi', director: 'The Wachowskis', rating: '8.7',
    plot: 'A hacker discovers the true nature of reality.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },

  { id: '5',  title: 'Parasite',
    year: '2019', genre: 'Thriller', director: 'Bong Joon-ho', rating: '8.5',
    plot: 'A poor family schemes to work for the wealthy.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },

  { id: '6',  title: 'Whiplash',
    year: '2014', genre: 'Drama', director: 'Damien Chazelle', rating: '8.5',
    plot: 'A student drummer pursues perfection.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg' },

  { id: '7',  title: 'The Prestige',
    year: '2006', genre: 'Mystery', director: 'Christopher Nolan', rating: '8.5',
    plot: 'Two magicians engage in a bitter rivalry.',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_face/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg' },

  { id: '8',  title: 'Coco',
    year: '2017', genre: 'Animation', director: 'Lee Unkrich', rating: '8.4',
    plot: 'A boy visits the Land of the Dead.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg' },

  { id: '9',  title: 'Mad Max: Fury Road',
    year: '2015', genre: 'Action', director: 'George Miller', rating: '8.1',
    plot: 'A woman flees a tyrant across a wasteland.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg' },

  { id: '10', title: 'Knives Out',
    year: '2019', genre: 'Mystery', director: 'Rian Johnson', rating: '7.9',
    plot: 'A detective investigates a family patriarch.',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_face/pThyQovXQrw2m0s9x82twj48Jq4.jpg' },
  { id: '11', title: 'Promare',
    year: '2019', genre: 'Sci-Fi', director: 'Hiroyuki Imaishi', rating: '7.6', 
    plot: 'A gung-ho rookie firefighter teams up with a leader of pyrokinetic mutants to stop a corrupt government plot and save the world from destruction.',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_face/cCVRivpiVUJ4Wn6gHm8pLXppXla.jpg'},
  
  { id: '12', title: 'Grave of the Fireflies', 
    year: '1988', genre: 'Historical', director: 'Isao Takahata', rating: '9.2', 
    plot: 'a teenage boy and his little sister struggle to survive on their own in Japan after an American firebombing separates them from their parents.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg' },
  
  { id: '13', title: 'Nausicaä of the Valley of the Wind', 
    year: '1984', genre: 'Fantasy', director: 'Hayao Miyazaki', rating: '8.0', 
    plot: 'In a post-apocalyptic world ravaged by a toxic jungle and giant insects, a compassionate princess named Nausicaä strives to stop two warring nations from unleashing a devastating weapon that would destroy humanity and the rejuvenating natural world.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/tcrkfB8SRPQCgwI88hQScua6nxh.jpg' },
  
  { id: '14', title: 'The Castle of Cagliostro', 
    year: '1979', genre: 'Action', director: 'Hayao Miyazaki', rating: '7.6', 
    plot: 'Master thief Lupin III travels to the small European country of Cagliostro to track down the source of high-quality counterfeit money, where he decides to rescue a runaway princess from a sinister Count who is forcing her into marriage to secure a fabled treasure.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/p7xL3WYeclgtGCLrWfBrXKdBV7d.jpg' },
  
  { id: '15', title: 'Weathering with You', 
    year: '2019', genre: 'Fantasy/Romance', director: 'Makoto Shinkai', rating: '7.5', 
    plot: 'A high-school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather, but their romance faces challenges as the city faces constant rain and the girls ability comes with a heavy cost.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/qgrk7r1fV4IjuoeiGS5HOhXNdLJ.jpg' },
  
  { id: '16', title: "Howl's Moving Castle", 
    year: '2004', genre: 'Fantasy/Adventure', director: 'Hayao Miyazaki', rating: '8.2', 
    plot: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his magnificent flying castle.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/13kOl2v0nD2OLbVSHnHk8GUFEhO.jpg' },
  
  { id: '17', title: 'When Marnie Was There', 
    year: '2014', genre: 'Drama/Fantasy', director: 'Hiromasa Yonebayashi', rating: '7.6', 
    plot: 'A young, introverted girl named Anna is sent to a quiet seaside town for her health, where she befriended a mysterious blonde girl named Marnie, who lives in a desolate mansion, leading Anna to uncover secrets about her own family history.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/vug1dvDI1tSa60Z8qjCuUE7ntkO.jpg' },
  
  { id: '18', title: 'Pom Poko', 
    year: '1994', genre: 'Comedy/Fantasy', director: 'Isao Takahata', rating: '7.2', 
    plot: 'A community of magical tanuki (Japanese raccoon dogs) in suburban Tokyo use their shapeshifting powers to fight back against developers destroying their forest habitat to build new residential areas.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/zat2MMhejQyJJN6CucLI9Or9kdo.jpg' },
  
  { id: '19', title: 'The Tale of Princess Kaguya', 
    year: '2013', genre: 'Fantasy/Drama', director: 'Isao Takahata', rating: '8.0', 
    plot: 'Found inside a stalk of bamboo, a tiny girl grows rapidly into a beautiful young lady, forced to live in the city by her adoptive parents, where she attracts suitors but must confront her true origins and a celestial fate.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/cQidJuA546OSSXKWXoiCeINDxuj.jpg' },
  
  { id: '20', title: 'Demon Slayer: Mugen Train', 
    year: '2020', genre: 'Action/Fantasy', director: 'Haruo Sotozaki', rating: '8.2', 
    plot: 'Tanjiro Kamado and his companions board a mysterious train with Flame Hashira Kyojuro Rengoku to hunt a demon that has caused numerous disappearances, only to fall into a dream-based trap.',
    posterUrl: 'https://media.themoviedb.org/t/p/w94_and_h141_face/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg' }
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(MOVIES);
  const router = useRouter();

  useEffect(() => {
    const result = MOVIES.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
        style={{
          margin: 16,
          padding: 10,
          borderWidth: 1,
          borderRadius: 8,
        }}
      />

      {filtered.length === 0 ? (
        <ErrorMessage message="No movies found." />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              year={item.year}
              genre={item.genre}
              posterUrl={item.posterUrl}
              onPress={() => router.push(`/detail/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}