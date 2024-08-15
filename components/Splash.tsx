import { SessionClientRepository } from "@/repositories/SessionClientRepository";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { View, Text, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputChangeEventData } from "react-native";
import { ActivityIndicator, Button, IconButton, Surface, TextInput, Title } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Splash() {
  return (
    <Surface style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator animating={true} />
    </Surface>
  )
}

export {
  Splash
}