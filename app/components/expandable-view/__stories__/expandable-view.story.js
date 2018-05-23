import ExpandableView from "..";

import EventDetailsCard from "../../event-details-card";
import layout from "/.storybook/decorators/layout";

import { number } from "@storybook/addon-knobs";

import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import React from "react";


storiesOf( "ExpandableView", module )
    .addDecorator( layout() )
    .add( "default", () => (
        <EventDetailsCard style={ { paddingBottom: 0 } }>
            <ExpandableView paddingBottom={ number( "paddingBottom", 6 ) }>
                <Text>
                Sed ut perspiciatis unde omnis iste natus error
                sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas
                sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem
                sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit,
                sed quia non numquam eius modi tempora incidunt ut
                labore et dolore magnam aliquam quaerat voluptatem.
                Ut enim ad minima veniam, quis nostrum exercitationem
                ullam corporis suscipit laboriosam, nisi ut aliquid ex
                ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam
                nihil molestiae consequatur, vel illum qui dolorem
                eum fugiat quo voluptas nulla pariatur?
                </Text>
            </ExpandableView>
        </EventDetailsCard>
    ) )
    .add( "short", () => (
        <EventDetailsCard>
            <ExpandableView paddingBottom={ number( "paddingBottom", 0 ) }>
                <Text>
                Sed ut perspiciatis unde omnis iste natus error
                sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
                </Text>
            </ExpandableView>
        </EventDetailsCard>
    ) )
;
