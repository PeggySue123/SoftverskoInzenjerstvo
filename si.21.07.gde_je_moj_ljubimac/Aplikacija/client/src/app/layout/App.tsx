import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import OglasDashboard from '../../features/oglasi/dashboard/OglasDashboard';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import OglasDetails from '../../features/oglasi/details/OglasDetails';
import OglasForm from '../../features/oglasi/form/OglasForm';
import NotFound from '../layout/NotFound';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import { ToastContainer } from 'react-toastify';
import ProfilePage from '../../features/profiles/ProfilePage';
import KorisnikDashboard from '../../features/oglasi/dashboard/KorisnikDashboard';
import Footer from '../../features/footer/Footer';
import Poruka from '../../features/oglasi/dashboard/Poruka';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded)
    return <LoadingComponent content='Učitavanje aplikacije...' />


  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em', marginBottom: '7em' }}>
              <Switch>
                <Route
                  exact path='/oglasi'
                  component={OglasDashboard}
                />
                <Route
                  exact path='/korisnici'
                  component={KorisnikDashboard}
                />
                <Route
                  path='/oglasi/:id'
                  component={OglasDetails}
                />
                <Route
                  key={location.key}
                  exact path={['/kreirajoglas', '/manage/:id']}
                  component={OglasForm}
                />
                <Route path='/korisnici/:id' component={ProfilePage} />
                <Route path='/poruke' component={Poruka} />
                <Route component={NotFound} />
              </Switch>
            </Container>
            <Footer />
          </Fragment>
        )} />
    </Fragment>
  );
}

export default withRouter(observer(App));
