import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {linkTo} from "@storybook/addon-links";

import {Header} from "../src/components/header";
import {Autocomplete} from "../src/components/autocomplete";
import {Button} from "../src/components/button";
import {Input} from "../src/components/input";

storiesOf("Header", module).add("default", () => <Header/>);

storiesOf("Button", module)
    .add("default", () => <Button default>Простая</Button>)
    .add("primary", () => <Button primary>Главная</Button>)
    .add("disabled", () => <Button disabled>Заблокированная</Button>);

storiesOf("Input", module)
    .add("type text", () => <Input label="Текст" type="text"/>)
    .add("type date", () => <Input label="Дата" type="date"/>);

storiesOf("Autocomplete", module)
    .add("with users", () =>
        <Autocomplete
            titleKey="login"
            subtitleKey="homeFloor"
            avatarKey="avatarUrl"
            placeholder="Хомяк привет"
            label="Пирожочкиии"
            items={
                [
                    {
                        "id": 1,
                        "login": "veged",
                        "homeFloor": 0,
                        "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    },
                    {
                        "id": 2,
                        "login": "alt-j",
                        "homeFloor": 3,
                        "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    },
                    {
                        "id": 3,
                        "login": "yeti-or",
                        "homeFloor": 2,
                        "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    }
                ]
            }
        />
    );
