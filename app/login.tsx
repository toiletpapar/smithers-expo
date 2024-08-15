import { SessionClientRepository } from "@/repositories/SessionClientRepository";
import { useState } from "react";
import { View, Text, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputChangeEventData } from "react-native";
import { Button, IconButton, Surface, TextInput, Title } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store'
import { useSession } from "@/hooks/useSession";
import { router } from "expo-router";

export default function Login() {
  const insets = useSafeAreaInsets()
  const sessionService = useSession()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleVisibilityToggle = () => {
    setShowPassword(!showPassword)
  }

  const [username, setUsername] = useState<string>('')
  const handleUsernameChangeText = (text: string) => {
    setUsername(text)
  }

  const [password, setPassword] = useState<string>('')
  const handlePasswordChangeText = (text: string) => {
    setPassword(text)
  }

  const handleLoginPress = async () => {
    try {
      if (sessionService) {
        await sessionService.login({username, password})
        router.replace('/')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Surface style={{flex: 1, justifyContent: 'center'}}>
      <View style={{marginTop: -insets.top, padding: 40}}>
        <Title style={{textAlign: 'center', paddingVertical: 10}}>Smithers</Title>
        <TextInput
          placeholder="Username"
          onChangeText={handleUsernameChangeText}
          value={username}
        />
        <TextInput
          placeholder="Password"
          style={{marginBottom: 10}}
          right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={handleVisibilityToggle} />}
          onChangeText={handlePasswordChangeText}
          secureTextEntry={!showPassword}
          value={password}
        />
        <Button mode="contained" style={{borderRadius: 8}} onPress={handleLoginPress}>Login</Button>
      </View>
    </Surface>
  )
}
