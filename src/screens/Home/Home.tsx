import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";
import { api } from "../../services/api";
import CardMovies from "../../components/CardMovies";
import { styles } from "./styles";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}


export default function Home() {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState("")
    const [noResult, setNoResult] = useState<Boolean>(false)
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([])

    useEffect(() => {
        loadMoreData();
    }, []);

    const loadMoreData = async () => {
        setLoading(true)
        const response = await api.get("/movie/popular", {
            params: {
                page: page,
            },
        });
        setDiscoveryMovies([...discoveryMovies,...response.data.results]);
        setPage(page + 1); // Correctly increment page
        setLoading(false)
    };

    const searchMovies = async (query: string) => {
        setLoading(true);
        const response = await api.get("/search/movie", {
            params: {
                query
            }
        });
        if (response.data.results.length === 0) {
            setNoResult(true);
        } else {
            setSearchResultMovies(response.data.results); // Corrected state setter
        }
        setLoading(false);
    };
    

    const handleSearch = (text : string) =>
    {
        setSearch(text)
        if(text.length > 2)
        {
            searchMovies(text)
        }else
        {
            setSearchResultMovies([])
        }
    }

    const movieData = search.length > 2 ? searchResultMovies : discoveryMovies

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
            </View>
            <View style={styles.containerInput}>
            <TextInput
            placeholderTextColor="#FFF"
            placeholder="Buscar"
            style={styles.input} 
            value={search} // Corrected the value prop
            onChangeText={handleSearch}
             />

                <MagnifyingGlass color="#FFF" size={25} weight="light" />
            </View>
            <View>
                <FlatList
                    data={movieData}
                    numColumns={3}
                    renderItem={({ item }) => <CardMovies data={item} />} // Corrected renderItem prop
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 35,
                        paddingBottom: 100,
                    }}
                    onEndReached={loadMoreData} // No need for arrow function
                    onEndReachedThreshold={0.5}
                />
                {loading && <ActivityIndicator size={50} color="#0296e5"/>}
            </View>
        </View>
    );
}
