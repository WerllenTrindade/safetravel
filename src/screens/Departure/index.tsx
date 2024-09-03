import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicencePlateInput } from '../../components/LicencePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content } from './styles';
import { TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { goBack } = useNavigation();
  
  const realm = useRealm();
  const user = useUser();
  
  const descriptionRef = useRef<TextInput>(null);
  const licencePlateRef = useRef<TextInput>(null);
  
  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licencePlateRef.current?.focus();
        return Alert.alert('Place inválida!', 'A placa é inválida, Por favor, informe a placa correta do veiculo.')
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo')
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          description,
          license_plate: licensePlate.toUpperCase(),
          user_id: user!.id
        }))
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');

      goBack();
    } catch (error) {
      console.log(error)
      return Alert.alert('Erro', 'Não foi possivel registrar a saída do veículo')
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <Container>
      <Header title='Saida' />

      <KeyboardAwareScrollView style={{ flex: 1 }} extraHeight={100}>
        <ScrollView>
          <Content>
            <LicencePlateInput
              ref={licencePlateRef}
              label='Place do Veiculo'
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              value={licensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label='Finalidade'
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
              value={description}
            />
            
            <Button
              isLoading={isRegistering}
              title='Registrar Saída'
              onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}