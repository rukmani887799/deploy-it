// @ts-nocheck
import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Box,
  useRadio, 
  useRadioGroup,
  Heading,
} from "@chakra-ui/react";
import thundercorelogo from "@/assets/thundercore.png";
import polygonLogo from "@/assets/polygon.png";
import mantleLogo from "@/assets/mantle.jpg";
import fireLogo from "@/assets/5ire.png";
import xdcLogo from "@/assets/xdc.jpg";
import Image from "next/image";
import { useState } from "react";

const optionToLogo: any = {
  "mantle": mantleLogo,
  "5ire": fireLogo,
  "thundercore": thundercorelogo,
  "xdc": xdcLogo,
  "polygon": polygonLogo,
};

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        w="full"
        display="flex"
        alignItems="center"
        {...checkbox}
        padding="14px 24px"
        fontWeight="500"
        fontSize="12px"
        textTransform="uppercase"
        letterSpacing="0.1em"
        color="#fff"
        mt="1.5px"
        ml="0.75px"
        style={{
          fontFeatureSettings: "'ss02' on",
        }}
        cursor="pointer"
        borderRadius="8px"
        _checked={{
          bg: "rgba(30, 98, 255, 0.2)",
          color: "white",
          borderColor: "#1e62ff",
        }}
        _focus={{
          outline: "none",
        }}
        border="1px solid #34384e"
      >
        <Image
          alt="deploy"
          src={optionToLogo[props.value]}
          width={32}
          height={32}
          style={{ marginRight: "20px", height: 32, objectFit: "contain" }}
        />
        {props.children}
      </Box>
    </Box>
  );
}

export const DeployModal = ({
  isOpen,
  onClose,
  deployContract,
  deployHash,
  deployLoading,
  deployUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  deployContract: () => Promise<void>;
  deployHash: string;
  deployLoading: boolean;
  deployUrl: string;
}) => {
  const [value, setValue] = useState("");
  const options = [
    "mantle",
    "5ire",
    "thundercore",
    "xdc",
    "polygon",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "",
    onChange: (newValue) => setValue(newValue),
  });

  const group = getRootProps();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="unset"
          backgroundColor="#242736"
          boxShadow="rgb(0 0 0 / 20%) 0px 0px 50px"
          width="600px"
          borderRadius="24px"
        >
          <Flex padding="32px">
            <VStack
              {...group}
              w="full"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Heading
                fontWeight="500"
                fontSize="12px"
                textTransform="uppercase"
                letterSpacing="0.1em"
                color="#fff"
                mt="1.5px"
                ml="0.75px"
                style={{
                  fontFeatureSettings: "'ss02' on",
                }}
                mb="24px"
              >
                Deploy contract
              </Heading>
              {deployHash ? (
                <Heading
                  fontWeight="500"
                  fontSize="12px"
                  letterSpacing="0.1em"
                  color="#fff"
                  mt="1.5px"
                  ml="0.75px"
                  mb="24px"
                >
                  Contract deployed to{" "}
                  <a
                    href={deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    {deployHash}
                  </a>
                  !
                </Heading>
              ) : (
                <>
                  {options.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </>
              )}
            </VStack>
          </Flex>
          {!deployHash && (
            <Flex
              padding="32px"
              borderTop="1px solid #34384e"
              justifyContent="flex-end"
            >
              <Button
                isLoading={deployLoading}
                onClick={() => deployContract({ network: value })}
                boxShadow="rgb(0 0 0 / 10%) 0px 5px 10px"
                padding="14px 24px"
                fontWeight="500"
                fontSize="10px"
                textTransform="uppercase"
                letterSpacing="0.1em"
                color="#fff"
                mt="1.5px"
                ml="0.75px"
                style={{
                  fontFeatureSettings: "'ss02' on",
                }}
                borderRadius="8px"
                background={"#1e62ff"}
                _hover={{
                  background: "rgba(30, 98, 255, 0.7)",
                }}
              >
                Deploy
              </Button>
            </Flex>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
