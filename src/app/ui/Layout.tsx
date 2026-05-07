import {
  Text,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import './LayoutStyle';
import LayoutStyle from './LayoutStyle';
import { useContext } from 'react';
import AppContext from '../../features/context/AppContext';
import Home from '../../pages/home/Home';
import Calc from '../../pages/calc/Calc';
import NotFound from '../../pages/notFound/NotFound';

export default function Layout() {
  const { navigate, activeRoute } = useContext(AppContext);
  const { width, height } = useWindowDimensions();

  return (
    <>
      {width < height && (
        <View style={LayoutStyle.topBar}>
          <TouchableOpacity onPress={() => navigate('-1')}>
            <Text style={LayoutStyle.topBarBack}>〈</Text>
          </TouchableOpacity>

          <Text style={LayoutStyle.topBarText}>React Native Intro</Text>

          <Text> </Text>
        </View>
      )}

      <View style={LayoutStyle.content}>
        {activeRoute.page === 'home' ? (
          <Home />
        ) : activeRoute.page === 'calc' ? (
          <Calc />
        ) : (
          <NotFound />
        )}
      </View>
      {width < height && (
        <View style={LayoutStyle.bottomBar}>
          <TouchableOpacity onPress={() => navigate('home')}>
            <Text>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('calc')}>
            <Text>Calc</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('notFound')}>
            <Text>Not Found</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
