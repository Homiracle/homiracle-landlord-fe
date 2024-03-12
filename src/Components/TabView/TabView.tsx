import { FlatList } from "native-base";
import React from "react";
import { TabButton, TabButtonProps } from "./TabButton";

export interface TabViewProps {
    tab: {
        tabbutton: TabButtonProps,
        content?: React.ReactNode,
    }[];
}

export const TabView: React.FC<TabViewProps> = ({
    tab,
}) => {
    
    return (
        <FlatList 
            style={{
                margin: 10,
            }}
            data={tab}
            horizontal={true}
            contentContainerStyle={{alignItems: 'center', gap: 5}}
            renderItem={({item}) => (
                <TabButton
                    name={item.tabbutton.name}
                    isClicked={item.tabbutton.isClicked}
                    number={item.tabbutton.number}
                />
            )}
        >
        </FlatList>
    )
}