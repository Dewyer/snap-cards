import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';
import routes from '../routes';

import HomeView from "./HomeView";
import GameView from "./GameView"

const RootView: React.FunctionComponent<{}> = () => (
    <Fragment>
        <main>
            <Switch>
                <Route exact path={routes.HOME} component={HomeView} />
                <Route exact path={routes.GAME} component={GameView} />
            </Switch>
        </main>
    </Fragment>
);

export default RootView;
