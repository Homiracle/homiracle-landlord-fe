import { useAppTheme } from "../../Theme";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Badge } from "react-native-paper";

export interface TabButtonProps {
    isClicked: boolean;
    name: string;
    number?: number;
    content?: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({
    isClicked = false,
    name,
    number,
}) => {
    const homiralceTheme = useAppTheme();

    const styles = StyleSheet.create({
        button: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            borderRadius: 100,
            paddingHorizontal: 15,
            paddingVertical: 10,
        },
        backGroundActive: {
            backgroundColor: homiralceTheme.colors.primary,
            
        },
        backGroundInActive: {
            backgroundColor: 'white',
            borderColor: homiralceTheme.colors.primary,
        },
        textActive: {
            color: 'white',
        },
        textInActive: {
            color:  homiralceTheme.colors.primary,
        }
    })

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isClicked? styles.backGroundActive: styles.backGroundInActive,
            ]}>
            <Text
                style={[
                    homiralceTheme.fonts.labelLarge,
                    isClicked? styles.textActive: styles.textInActive,
                    {height: 20}
                ]}>
                {name}
            </Text>
            {number && (<Text
                style={[
                    {
                        borderRadius: 10,
                        padding: 2,
                    },
                    homiralceTheme.fonts.labelSmall,
                    isClicked? styles.textInActive: styles.textActive,
                    isClicked? styles.backGroundInActive: styles.backGroundActive,
                ]}>
                    {number}
            </Text>)}
        </TouchableOpacity>
    )
}