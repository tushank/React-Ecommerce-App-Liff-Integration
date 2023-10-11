import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Contact from './components/Contact';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LineProfileComponent from './components/LineProfileComponent';
import liff from '@line/liff';
import { useEffect, useState } from 'react';

function App() {
  const myLiffId = '2001073406-74eKPLm9';
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import('@line/liff').then((liff) => {
      console.log('start liff.init()...');
      liff
        .init({ liffId: myLiffId })
        .then(() => {
          console.log('liff.init() done', liffObject);
          setLiffObject(liff);
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!myLiffId) {
            console.info(
              'LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.'
            );
          }
          setLiffError(error.toString());
        });
    });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Product} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/Profile" component={LineProfileComponent} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
