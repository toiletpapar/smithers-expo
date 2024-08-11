import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [text, setText] = useState('')

  return (
    <View style={{flex: 0.75}}>
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
        <Text>More Text</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1
        }}
      >
        <Text>Test live reload</Text>
        <TextInput
          style={{
            borderWidth: 1,
            height: 40
          }}
          onChangeText={setText}
          value={text}
          placeholder='test'
        />
      </View>
      <View>
        <Text>Some non-flex text</Text>
      </View>
    </View>
  )
}
