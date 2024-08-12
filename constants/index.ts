import { Dimensions, Platform } from "react-native";
import { scaledSize, scaledY } from "../utils/scaleSize";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const cardWidth =
  Platform.OS !== "web"
    ? scaledSize(373)
    : SCREEN_WIDTH > SCREEN_HEIGHT
    ? 600
    : SCREEN_WIDTH * 0.98;
export const cardHeight = scaledY(560);
export const CARD_LENGTH =
  Platform.OS !== "web"
    ? SCREEN_WIDTH * 0.8
    : SCREEN_WIDTH > SCREEN_HEIGHT
    ? 375 * 0.8
    : SCREEN_WIDTH * 0.8;
export const SPACING =
  Platform.OS !== "web"
    ? SCREEN_WIDTH * 0.02
    : SCREEN_WIDTH > SCREEN_HEIGHT
    ? 375 * 0.8 * 0.02
    : SCREEN_WIDTH * 0.8 * 0.02;
export const SIDECARD_LENGTH = (SCREEN_WIDTH * 0.18) / 2;
export enum EnSkillsIkon {
  Creation = "Creation",
  Delivery = "Delivery",
  Firebase = "Firebase",
  Code = "Code",
  WEB3 = "WEB3",
}
export const skills = [
  {
    icon: EnSkillsIkon.Code,
    title: "Programming",
    text: [
      "JavaScript is a lightweight interpreted programming language with first-class functions.JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.",
      "TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript.",
      "React is a declarative, components based JavaScript library for creating user interfaces",
      "React Native brings the best parts of developing with React to native development. It's a best-in-class JavaScript library for building user interfaces for Android, iOS, and more .",
      "Redux is an open -source JavaScript  library for managing application state.",
      "MobX is unopinionated and allows you to manage your application state outside of any UI framework.",
      "Zustand.js: modern, weightless, productive and very flexible state manager",
    ],
  },
  {
    title: "Continous Integration and Continous Delivery",
    icon: EnSkillsIkon.Delivery,
    text: [
      "Github actions: automate, customize, and execute your software development workflows right in your repository",
      "Bitrise is a top mobile CI/CD platform, streamlining build, test, and deployment for mobile apps.",
    ],
  },
  {
    title: "Firebase",
    icon: EnSkillsIkon.Firebase,
    text: [
      "Firebase, Google's mobile and web app development platform that helps developers build apps and games that users will love.",
      "Authentication",
      "Cloud Firestore",
      "Functions",
      "Storage",
      "App Distribution",
      "Crashlytics",
      "Remote Config",
      "Messaging",
      "Analitics",
    ],
  },
  {
    title: "App distribution",
    icon: EnSkillsIkon.Delivery,
    text: [
      "App Store is an application store developed and supported by Apple for mobile devices based on the iOS and iPadOS operating systems.",
      "Google Play is the official Google store for Android operating systems",
    ],
  },
  {
    title: "WEB3",
    icon: EnSkillsIkon.WEB3,
    text: [
      "WWB3Auth: wallet creation in seconds - all while keeping it secure, non-custodial , and seed phrase-free via Multi-Party Computation (MPC) and Account Abstractionstems.",
      "Ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem",
      "@solana/web3.js to interact with accounts and programs on the Solana network through the Solana JSON RPC API.",
    ],
  },
];
