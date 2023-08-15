import React, { Component } from 'react'
import TopSection from './topsection'
import Banner from './banner'
import TopStample from './top-stample'
import BestOfferBanner from './best-offer'

export default class Home extends Component {
  render() {
    return (
        <div className="wrapper">
        <Banner/>
        <TopSection/>
        <BestOfferBanner/>
        {/* <TopStample/> */}
        </div>
    )
  }
}
