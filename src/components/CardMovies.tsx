import { View, Text, Image, Pressable} from "react-native";
import {styles} from "./Styles" 
interface Movie 
{
    id: number,
    poster_path: string
}

interface Props 
{
    data: Movie,
    onPress? : () => void
}

export default function CardMovies({data, onPress}: Props)
{
    return(
        <Pressable onPress={onPress} style={styles.cardMovies}>
            <Image source={{
                uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            }} 
            style={styles.cardImage}/>
        </Pressable>
    )
}