import * as React from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button, Header } from 'react-native-elements';
import * as uuidv4 from 'uuid/v4';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

interface Props {
  onSubmit: Function;
}

export class NameForm extends React.Component<Props> {
  state = {
    name: ''
  };
  public handleNameInput(name: String) {
    this.setState({
      name
    });
  }
  public handleSubmit() {
    const randomId = uuidv4();
    const user = {
      _id: randomId,
      name: this.state.name,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
    this.props.onSubmit(user);
  }
  getRandomId() {
    return Math.floor(Math.random() * 100000);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header centerComponent={{ text: 'NAME', style: { color: '#fff' } }} />
        <View style={{ flex: 1 }}>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={value => this.handleNameInput(value)} />
          <Button
            title="Submit"
            onPress={e => this.handleSubmit(e)}
            disabled={!this.state.name}
          />
        </View>
      </View>
    );
  }
}
