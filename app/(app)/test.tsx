import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from '@shopify/flash-list'

export default function Index() {
  const [text, setText] = useState('')

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
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
      <View style={{flex: 1}}>
        <Text>Some non-flex text</Text>
        <FlashList
          data={[
            {
              title: 'item 1'
            },
            {
              title: 'item 2'
            }
          ]}
          estimatedItemSize={47}
          renderItem={({item}) => (<Text>{item.title}</Text>)}
        />
      </View>
    </View>
  )
}
