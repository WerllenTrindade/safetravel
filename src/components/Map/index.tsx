import MapView, { MapViewProps, PROVIDER_GOOGLE, LatLng, Marker, Polyline } from "react-native-maps"
import { IconBox } from "../IconBox";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from "../../theme";
import { useRef } from "react";

interface Props extends MapViewProps {
    coordinates: LatLng[];
}

export function Map({coordinates , ...rest}: Props){
    const mapRef = useRef<MapView>(null);
    const lastCoordinates = coordinates[coordinates.length - 1];


    async function onMapLoaded(){
        if(coordinates.length > 1){
           mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
            edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
           })
        }
    }

    return (
        <MapView
            ref={mapRef}
            {...rest}
            provider={PROVIDER_GOOGLE} //chave do google
            style={{ width: '100%', height: 200 }}
            region={{
                latitude: lastCoordinates.latitude,
                longitude: lastCoordinates.longitude,
                latitudeDelta: 0.005, //REGIÃO DO MAPA E PROXIMIDADE
                longitudeDelta: 0.005,
            }} //CORDENADA
            onMapLoaded={onMapLoaded} //usado para o mapa se ajustar qunando tiver 2 
        >
            <Marker identifier="departure" coordinate={coordinates[0]}>
            <IconBox icon={<FontAwesome name="car" size={16} color={theme.COLORS.BRAND_LIGHT}/>}/>
            </Marker>
            
            {
                coordinates.length > 1 &&
                <>
                <Marker identifier="arrival" coordinate={lastCoordinates}>
                    <IconBox icon={<FontAwesome name="car" size={16} color={theme.COLORS.BRAND_LIGHT}/>}/>
                </Marker>

                <Polyline coordinates={[...coordinates]} 
                    strokeColor={theme.COLORS.GRAY_700}
                    strokeWidth={8}
                />
                </>
            }
        </MapView>
    )
}