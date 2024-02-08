import {Component} from 'react'
import Header from '../Header'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import MenuCardItems from '../MenuCardItems'

import DishItems from '../DishItems'

import './index.css'

class Home extends Component {
  state = {
    menuList: [],
    presentTab: 'Salads and Soup',
    restaurantName: '',
  }
  componentDidMount() {
    this.renderApiCall()
  }

  renderApiCall = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
    this.setState({
      menuList: data[0].table_menu_list,
      restaurantName: data[0].restaurant_name,
    })
  }

  currentTab = id => {
    this.setState({presentTab: id})
  }

  render() {
    const {menuList, presentTab, restaurantName} = this.state
    let categoryDishes
    if (menuList.length > 0) {
      categoryDishes = menuList.find(
        category => category.menu_category === presentTab,
      ).category_dishes

      console.log(categoryDishes)
    }
    return (
      <div className="bg-container">
        <Header restaurantName={restaurantName} />
        <ul className="list-container">
          {menuList.map(eachItem => (
            <MenuCardItems
              key={eachItem.menu_category}
              tabDetails={eachItem}
              currentTab={this.currentTab}
            />
          ))}
        </ul>
        <hr className="line" />
        {menuList.length > 0 ? (
          <ul className="menu-item-container">
            {categoryDishes.map(eachMenu => (
              <DishItems key={eachMenu.dish_id} dishDetails={eachMenu} />
            ))}
          </ul>
        ) : (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        )}
      </div>
    )
  }
}

export default Home
