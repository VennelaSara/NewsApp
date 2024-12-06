import React, { Component } from 'react'
import NavBar from './components/navbar'; 
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
 state={
  progress:0
 }
  setProgress=(progress)=>{
this.setState({progress:progress})
  }
  render() {
    return (
      <div>
         <LoadingBar color='#f11946' 
         progress={this.state.progress}
         height={3}
         onLoaderFinished={()=>this.setProgress(0)}/>
        <NavBar></NavBar>
        <News pageSize={5} setProgress={this.setProgress}></News>
      </div>
    )
  }
}
