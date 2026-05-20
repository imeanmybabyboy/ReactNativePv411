import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import GameStyle from './ui/GameStyle';
import { ReactNode, useRef, useState } from 'react';
import GameColors from './ui/GameColors';

interface IGameState {
  label: string;
  score: number;
  field: Array<number>;
  prevField: Array<number> | null;
}

export default function Game() {
  const { width, height } = useWindowDimensions();
  const shortestSide = width < height ? width : height;
  const fieldSize = shortestSide * 0.95;
  const N = 4; // field size;
  const [gameState, setGameState] = useState<IGameState>({
    label: 'Hello',
    score: 0,
    field: [0, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2],
    prevField: null,
  });

  const canMoveLeft = (): boolean => {
    for (let r = 0; r < N; r++) {
      for (let c = 1; c < N; c++) {
        let i = r * N + c;

        if (
          gameState.field[i] !== 0 &&
          (gameState.field[i - 1] === gameState.field[i] ||
            gameState.field[i - 1] === 0)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const shiftLeft = (): void => {
    let wasMove: boolean;
    let i: number;
    for (let r = 0; r < N; r++) {
      do {
        wasMove = false;
        for (let c = 0; c < N - 1; c++) {
          i = r * N + c;
          if (gameState.field[i] === 0 && gameState.field[i + 1] !== 0) {
            gameState.field[i] = gameState.field[i + 1];
            gameState.field[i + 1] = 0;
            wasMove = true;
          }
        }
      } while (wasMove);
    }
  };

  const moveLeft = (): number => {
    shiftLeft();
    let collapsed = 0;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N - 1; c++) {
        let i = r * N + c;
        if (
          gameState.field[i] !== 0 &&
          gameState.field[i + 1] === gameState.field[i]
        ) {
          gameState.field[i] += gameState.field[i + 1];
          gameState.field[i + 1] = 0;
          collapsed += gameState.field[i];
        }
      }
    }
    if (collapsed > 0) {
      shiftLeft();
    }
    return collapsed;
  };

  const onSwipeLeft = () => {
    if (canMoveLeft()) {
      const prevField = [...gameState.field];

      setGameState({
        ...gameState,
        score: gameState.score + moveLeft(),
        label: 'Горизонтальний ліворуч',
        field: gameState.field,
        prevField,
      });
    } else setGameState({ ...gameState, label: 'Рух ліворуч неможливий' });
  };

  const onSwipeRight = () => {
    // setLabel('Горизонтальний праворуч');
  };

  const onSwipeTop = () => {
    // setLabel('Вертикальний уверх');
  };

  const onSwipeBottom = () => {
    // setLabel('Вертикальний униз');
  };

  return (
    <View style={GameStyle.container}>
      <View style={GameStyle.topBlock}>
        <View style={GameStyle.logo}>
          <Text style={GameStyle.logoText}>2048</Text>
        </View>
        <View style={GameStyle.topNav}>
          <View style={GameStyle.topScoreLine}>
            <Text style={GameStyle.topScore}>
              Score{'\n' + gameState.score}
            </Text>
            <Text style={GameStyle.topScore}>Best{'\n'}69.6k</Text>
          </View>
          <View style={GameStyle.topBtnLine}>
            <TouchableOpacity style={GameStyle.topBtn}>
              <Text style={GameStyle.topBtnText}>NEW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={GameStyle.topBtn}>
              <Text style={GameStyle.topBtnText}>UNDO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={GameStyle.label}>{gameState.label}</Text>

      <Swipeable
        onSwipeBottom={onSwipeBottom}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeTop={onSwipeTop}
      >
        <View
          style={[GameStyle.field, { width: fieldSize, height: fieldSize }]}
        >
          {gameState.field.map((num, index) => (
            <View
              key={index}
              style={[
                GameStyle.tile,
                {
                  backgroundColor: GameColors.bgColor(num),
                  width: 0.21 * fieldSize,
                  height: 0.21 * fieldSize,
                },
              ]}
            >
              <Text
                style={[
                  GameStyle.tileText,
                  {
                    color: GameColors.fgColor(num),
                    fontSize:
                      num < 10
                        ? fieldSize * 0.12
                        : num < 100
                        ? fieldSize * 0.1
                        : num < 1000
                        ? fieldSize * 0.08
                        : num < 10000
                        ? fieldSize * 0.07
                        : fieldSize * 0.06,
                  },
                ]}
              >
                {num}
              </Text>
            </View>
          ))}
        </View>
      </Swipeable>
    </View>
  );
}

function Swipeable({
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
  onSwipeBottom,
  onUnrecognized,
  children,
}: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeTop?: () => void;
  onSwipeBottom?: () => void;
  onUnrecognized?: (reason: string) => void;
  children: ReactNode;
}) {
  const minSwipeLength = 50.0;
  const minSwipeSpeed = minSwipeLength / 400;
  const startEvent = useRef<GestureResponderEvent | null>(null);

  const onGestureStart = (event: GestureResponderEvent) => {
    startEvent.current = event;
  };

  const onGestureFinish = (event: GestureResponderEvent) => {
    if (startEvent.current === null) return;
    const dx = event.nativeEvent.pageX - startEvent.current.nativeEvent.pageX;
    const dy = event.nativeEvent.pageY - startEvent.current.nativeEvent.pageY;
    const dt = event.timeStamp - startEvent.current.timeStamp;

    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (adx > 2 * ady) {
      if (adx < minSwipeLength) {
        if (onUnrecognized) onUnrecognized('HorizontalShort');
      } else if (adx / dt < minSwipeSpeed) {
        if (onUnrecognized) onUnrecognized('HorizontalSlow');
      } else {
        if (dx > 0) {
          if (onSwipeRight) onSwipeRight();
        } else {
          if (onSwipeLeft) onSwipeLeft();
        }
      }
    } else if (ady > 2 * adx) {
      if (ady < minSwipeLength) {
        if (onUnrecognized) onUnrecognized('VerticalShort');
      } else if (ady / dt < minSwipeSpeed) {
        if (onUnrecognized) onUnrecognized('VerticalSlow');
      } else if (dy > 0) {
        if (onSwipeBottom) onSwipeBottom();
      } else {
        if (onSwipeTop) onSwipeTop();
      }
    } else {
      if (onUnrecognized) onUnrecognized('Diagonal');
    }

    startEvent.current = null;
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onGestureStart}
      onPressOut={onGestureFinish}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
