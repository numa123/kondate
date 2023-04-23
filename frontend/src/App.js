import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Button,
  Input,
  Text,
  Textarea,
  Flex,
  Select,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import './App.css';

function App() {
  const [allData, setAllData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [beefNumber, setBeefNumber] = useState();
  const [porkNumber, setPorkNumber] = useState();
  const [chickenNumber, setChickenNumber] = useState();
  const [fishNumber, setFishNumber] = useState();
  const [sideDishNumber, setSideDishNumber] = useState();
  const [soupNumber, setSoupNumber] = useState();
  const [noodleNumber, setNoodleNumber] = useState();
  const [wholeNumber, setWholeNumber] = useState();
  const [newName, setNewName] = useState();
  const [newGenre, setNewGenre] = useState();
  const [newMemo, setNewMemo] = useState();

  const [alert, setAlert] = useState();

  const isError = newName === '';

  const setQuantityOfData = () => {
    let beef = 0;
    let pork = 0;
    let chicken = 0;
    let fish = 0;
    let sideDish = 0;
    let soup = 0;
    let noodle = 0;
    let whole = 0;

    for (let i = 0; i < allData.length; i++) {
      if (allData[i].genre === 'BEEF') {
        beef += 1;
      } else if (allData[i].genre === 'PORK') {
        pork += 1;
      } else if (allData[i].genre === 'CHICKEN') {
        chicken += 1;
      } else if (allData[i].genre === 'FISH') {
        fish += 1;
      } else if (allData[i].genre === 'SIDE_DISH') {
        sideDish += 1;
      } else if (allData[i].genre === 'SOUP') {
        soup += 1;
      } else if (allData[i].genre === 'NOODLE') {
        noodle += 1;
      }
    }
    whole = allData.length;
    setBeefNumber(beef);
    setPorkNumber(pork);
    setChickenNumber(chicken);
    setFishNumber(fish);
    setSideDishNumber(sideDish);
    setSoupNumber(soup);
    setNoodleNumber(noodle);
    setWholeNumber(whole);
  };

  //
  //
  //
  //
  //
  //
  const fetchData = async () => {
    try {
      const itemData = await axios.get('http://localhost:3000/menus/mongo');
      console.log(itemData.data);
      setAllData(itemData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => setQuantityOfData(), [allData]);

  const setGenreData = genre => {
    const newData = allData.filter(data => data.genre === genre);
    setDisplayData(newData);
  };

  const setWholeData = () => {
    setDisplayData(allData);
  };

  const createData = () => {
    if (isError) {
      setAlert('メニュー名を入力してください');
    } else {
      axios.post('http://localhost:3000/menus/mongo', {
        name: newName,
        genre: newGenre,
        memo: newMemo,
      });
      setTimeout(fetchData, 100);
      setNewName('');
      setNewGenre('');
      setNewMemo('');
      setAlert('');
    }
  };

  const deleteData = async (id, genre) => {
    await axios
      .delete(`http://localhost:3000/menus/${id}`)
      .then(() => fetchData())
      .then(() => setGenreData(genre));
  };
  //
  //
  //
  //
  //
  //
  //

  return (
    <ChakraProvider theme={theme}>
      <Flex
        bg={'#fffff4'}
        flexDirection={'column'}
        alignItems={'center'}
        textAlign={'center'}
        paddingTop={'60px'}
        minH={'100vh'}
        className="text"
        pb="30px"
        width={'fit-content'}
        minW={'100vw'}
      >
        <Box>
          <Text
          className='text'
            borderRadius={'4px'}
            borderBottom={"8px"}
            borderColor={'orange.200'}
            mb={'50px'}
            fontWeight={'bold'}
            fontSize={'3xl'}
            color={'#333333'}
          >
            🍎🐟献立考案補助アプリ🐣🥗
          </Text>
        </Box>
        <Flex>
          <Box>
            <Box>
              <Text
                fontSize={'xl'}
                fontWeight={'bold'}
                mb={'12px'}
                letterSpacing={'0.06em'}
              >
                メニューの追加
              </Text>
            </Box>
            <Box
              width={'500px'}
              padding={'24px'}
              bgColor={'orange.100'}
              borderRadius={'10px'}
              pb={'28px'}
            >
              <Input
                padding={'6px'}
                variant={'flushed'}
                bgColor={'whiteAlpha.700'}
                placeholder="メニュー名"
                fontSize={'15px'}
                type="text"
                value={newName}
                onChange={event => setNewName(event.target.value)}
              />
              {/* {isError ? (
                  <FormHelperText mb={'5px'}>
                    メニュー名を入れてください
                  </FormHelperText>
                ) : null} */}
              <Select
                variant={'flushed'}
                color={'gray'}
                bgColor={'whiteAlpha.700'}
                placeholder="ジャンル"
                fontSize={'15px'}
                type="text"
                value={newGenre}
                onChange={event => setNewGenre(event.target.value)}
              >
                <option value="BEEF">牛肉</option>
                <option value="PORK">豚肉</option>
                <option value="CHICKEN">鶏肉</option>
                <option value="FISH">魚類</option>
                <option value="SIDE_DISH">副菜</option>
                <option value="NOODLE">麺類</option>
                <option value="SOUP">スープ,鍋類</option>
              </Select>
              <Textarea
                padding={'6px'}
                variant={'flushed'}
                bgColor={'whiteAlpha.700'}
                borderRadius={'0 0 5px 5px'}
                placeholder="メモ"
                fontSize={'15px'}
                type="text"
                value={newMemo}
                onChange={event => setNewMemo(event.target.value)}
                style={{ resize: 'none' }}
                h={'120px'}
              />
              <Button
                mr="1px"
                _hover={{ bg: '#FBD38D' }}
                marginTop={'24px'}
                bgColor={'orange'}
                onClick={() => createData()}
                letterSpacing={'0.03em'}
              >
                メニューを追加
              </Button>
              <Text mt="14px">{alert}</Text>
            </Box>
          </Box>
          <Flex
            bg={''}
            marginLeft={'80px'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Box>
              <Text
                fontSize={'xl'}
                fontWeight={'bold'}
                mb={'12px'}
                letterSpacing={'0.06em'}
              >
                メニューの表示
              </Text>
            </Box>
            <Flex width={'640px'}>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setWholeData()}
              >
                全データ : {wholeNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('BEEF')}
              >
                牛肉 : {beefNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('PORK')}
              >
                豚肉 : {porkNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('CHICKEN')}
              >
                鶏肉 : {chickenNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('FISH')}
              >
                魚 : {fishNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('SIDE_DISH')}
              >
                副菜 : {sideDishNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('NOODLE')}
              >
                麺類 : {noodleNumber}
              </Button>
              <Button
                bg={'orange.200'}
                mr="1px"
                _hover={{ bg: '#FEEBC8' }}
                onClick={() => setGenreData('SOUP')}
              >
                スープ類 : {soupNumber}
              </Button>
              <IconButton mr={'4px'} icon={<RepeatIcon />}></IconButton>
            </Flex>
            <Flex
              mt="14px"
              bg={''}
              width={'fit-content'}
              align={'center'}
              borderBottom={'2px'}
              borderColor={'blue.400'}
              pb={'12px'}
              pt={'5px'}
              mb="6px"
            >
              <Box w={'200px'}>
                <Text
                  textAlign={'left'}
                  fontWeight={'bold'}
                  fontSize={'1.15rem'}
                  style={{ marginTop: '0px', marginRight: '8px' }}
                  ml={'26px'}
                  letterSpacing={'0.03em'}
                >
                  メニュー名
                </Text>
              </Box>
              <Box
                letterSpacing={'0.03em'}
                fontWeight={'bold'}
                fontSize={'1.15rem'}
                w={'80px'}
              >
                ジャンル
              </Box>
              <Box
                textAlign={''}
                width={'360px'}
                bgColor={''}
                paddingLeft={'8px'}
                pr={'4px'}
                fontWeight={'bold'}
                fontSize={'1.15rem'}
                letterSpacing={'0.03rem'}
              >
                メモ
              </Box>
            </Flex>
            <Flex
              bg={''}
              width={'fit-content'}
              align={'center'}
              borderBottom={'0px'}
              borderColor={'gray.400'}
              pb={'5px'}
              pt={'5px'}
            >
              <Box width={'640px'}>
                {displayData.map(data => (
                  <Flex
                    bg={''}
                    width={'fit-content'}
                    align={'center'}
                    borderBottom={'0px'}
                    borderColor={'gray.400'}
                    pb={'5px'}
                    pt={'5px'}
                  >
                    <Box className="text" width={'200px'} textAlign={'left'}>
                      <Text
                        fontWeight={'bold'}
                        fontSize={'xl'}
                        style={{ marginTop: '0px', marginRight: '8px' }}
                        ml={'26px'}
                        color={'#333333'}
                        letterSpacing={'0.03em'}
                      >
                        {data.name}
                      </Text>
                    </Box>
                    <Box width={'80px'} color="#333333">
                      {data.genre === 'BEEF' ? '牛肉' : ''}
                      {data.genre === 'PORK' ? '豚肉' : ''}
                      {data.genre === 'CHICKEN' ? 'とり肉' : ''}
                      {data.genre === 'FISH' ? '魚類' : ''}
                      {data.genre === 'SIDE_DISH' ? '副菜' : ''}
                      {data.genre === 'NOODLE' ? '麺類' : ''}
                      {data.genre === 'SOUP' ? 'スープ類' : ''}
                    </Box>
                    <Box
                      textAlign={'left'}
                      width={'360px'}
                      bgColor={''}
                      paddingLeft={'8px'}
                      pr={'4px'}
                      className="text"
                      color="#333333"
                      letterSpacing={'0.03em'}
                    >
                      {data.memo}
                    </Box>
                    <IconButton
                      icon={<DeleteIcon />}
                      bg={'gray.300'}
                      onClick={() => deleteData(data._id, data.genre)}
                    >
                      削除
                    </IconButton>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* <Box mt={'20px'} h={'40px'} bgColor="gray.300"></Box> */}
    </ChakraProvider>
  );
}

export default App;
