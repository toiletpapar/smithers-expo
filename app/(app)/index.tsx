import { Splash } from "@/components/Splash";
import { SessionClientRepository } from "@/repositories/SessionClientRepository";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { View, Text, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputChangeEventData } from "react-native";
import { ActivityIndicator, Button, IconButton, Surface, TextInput, Title } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store'
import { User } from "@/models/User";

export default function Home() {
  return (
    <Surface style={{flex: 1}}>
      <Text>Today's Manga</Text>
    </Surface>
  )
}
