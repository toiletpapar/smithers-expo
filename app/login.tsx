import { SessionClientRepository } from "@/repositories/SessionClientRepository";
import { useState } from "react";
import { View, Text, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputChangeEventData } from "react-native";
import { Avatar, Button, Card, IconButton, Surface, TextInput, Title } from "react-native-paper";
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
      
    }
  }

  return (
    <Surface style={{flex: 1, justifyContent: 'center'}}>
      <View style={{marginTop: -insets.top, padding: 40}}>
        <Title style={{textAlign: 'center', paddingVertical: 10}}>Smithers</Title>
        {
          sessionService?.hasError && (
            <Card elevation={2} style={{marginVertical: 10}}>
              <Card.Title title="Unauthorized" subtitle="Username/Password is incorrect" left={({size}) => <Avatar.Icon size={size} icon="alert-octagon" />} />
            </Card>
          )
        }
        <TextInput
          placeholder="Username"
          onChangeText={handleUsernameChangeText}
          value={username}
          error={sessionService?.hasError}
        />
        <TextInput
          placeholder="Password"
          style={{marginBottom: 10}}
          right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={handleVisibilityToggle} />}
          onChangeText={handlePasswordChangeText}
          secureTextEntry={!showPassword}
          value={password}
          error={sessionService?.hasError}
        />
        <Button mode="contained" style={{borderRadius: 8}} onPress={handleLoginPress}>Login</Button>
      </View>
    </Surface>
  )
}
