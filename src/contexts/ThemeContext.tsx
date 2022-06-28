import { createContext, ReactNode, useState } from "react";
import { darkTheme, lightTheme } from "../../styles/theme";
import { ThemeProvider } from "styled-components";

interface InterfaceArrayThemeStyle {

    bg: string,
    bgAlpha: string,
    bg2: string,
    bg3: string,
    text: string,
    primary: string,

}


interface InterfaceThemeContext {
    theme: string,
    setTheme: Function,

}

interface PropsThemeProvider {
    children: ReactNode;
}

export const ThemeContext = createContext({} as InterfaceThemeContext);

export function ThemesProvider(props: PropsThemeProvider) {
    const [theme, setTheme] = useState<string>("light");
    const themeStyle = theme === 'light' ? lightTheme : darkTheme;
    console.log("provider");

    console.log(theme);



    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={themeStyle}>
                {props.children}
            </ThemeProvider>


        </ThemeContext.Provider>
    )

}