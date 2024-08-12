import { ImageResolvedAssetSource } from "react-native";
import { create } from "zustand";
import { Images } from "../constants/images";

export type appExample = {
  img: ImageResolvedAssetSource;
  description: string;
  iosLink: string;
  androidLink: string;
  title: string;
  technologies: string[];
};
export interface IAppStore {
  appsExamples: appExample[];
}

export const useAppStore = create<IAppStore>(() => ({
  appsExamples: [
    {
      img: Images.step,
      description: "Crypto Wallet App for Step app users",
      iosLink:
        "https://apps.apple.com/ua/app/step-crypto-wallet/id6468771146?l=en",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.stepwallet",
      title: "Step Crypto Wallet",
      technologies: [
        "React Native",
        "Zustand",
        "React Native Reanimated",
        "Web3Auth",
        "Ethers",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.marsan,
      description: "App for p2p crypto trading",
      iosLink: "https://apps.apple.com/app/marsan-exchange/id6446777151",
      androidLink: "",
      title: "Marsan exchange",
      technologies: [
        "React Native",
        "Zustand",
        "React Native Reanimated",
        "Web3Auth",
        "Ethers",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.memelute,
      description: "Crypto wallet for Solana network tokens",
      iosLink: "",
      androidLink: "",
      title: "Memelute",
      technologies: [
        "React Native",
        "Zustand",
        "React Native Reanimated",
        "Web3Auth",
        "Ethers",
        "@solana/web3.js",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.kruu,
      description: "Marketplace and cryptoWallet",
      iosLink: "",
      androidLink: "",
      title: "Kruuu",
      technologies: [
        "React Native",
        "Ethers",
        " Zustand",
        "React Native Reanimated",
        "Web3Auth",
      ],
    },
    {
      img: Images.iln,
      description: "App for managing bonuses and cryptoWallet",
      iosLink:
        "https://apps.apple.com/ua/app/interlinked-loyalty-network/id6478855875?l=en",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.iln_loyalty.app",
      title: "Inter Linked Loyalty Network",
      technologies: [
        "React Native",
        "Zustand",
        "React Native Reanimated",
        "Web3Auth",
        "Ethers",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.laika,
      description: "Crypto Wallet for Ethereum and Solana network tokens",
      iosLink:
        "https://apps.apple.com/ua/app/laika-crypto-wallet/id6482348768?l=en",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.laikaWallet.app",
      title: "Laika Wallet",
      technologies: [
        "React Native",
        "Zustand",
        "Web3Auth",
        "Ethers",
        "@solana/web3.js",
        "React Native Reanimated",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.p2p,
      description: "App for p2p crypto trading",
      iosLink: "",
      androidLink: "",
      title: "Stable Coin Space",
      technologies: [
        "React Native",
        "Zustand",
        "React Native Reanimated",
        "Web3Auth",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.eva,
      description: "Crypto wallet app.",
      iosLink: "https://apps.apple.com/app/eva-crypto-wallet/id6447961796",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.tenet.eva",
      title: "Eva Crypto Wallet",
      technologies: [
        "React Native",
        "Zustand",
        "React Native Reanimated",
        "Web3Auth",
        "Ethers",
        "Firebase services(push notifications, crashlytics, remote config, analytics)",
      ],
    },
    {
      img: Images.coffeeart,
      description: "App for Ukrainian chain of Coffee shops.",
      iosLink: "https://apps.apple.com/ua/app/coffee-art/id1602211212?l=ua",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.coffeeart1",
      title: "Coffee Art",
      technologies: [
        "React Native",
        "Google Maps API",
        "Firebase push notifications",
        "MobX",
        "React Native Reanimated for game and animations",
      ],
    },
    {
      img: Images.keyri,
      description: "App for 2-factor code management",
      iosLink: "",
      androidLink: "https://play.google.com/store/apps/details?id=com.keyri",
      title: "Keyri",
      technologies: ["React Native", "Redux", "Redux Saga"],
    },
  ],
}));
