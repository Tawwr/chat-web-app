import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getConversationByIdAPI, getUserConversationsAPI } from '../api'
import Desktop from '../components/home/desktop.component'
import MobileChat from '../components/home/mobileChat.component'
import MobileMessages from '../components/home/mobileMessages.component'
import { setConversationView } from '../redux/reducers/app'
import {
  setConversations,
  setSelectedConversation
} from '../redux/reducers/conversation'
import { RootState } from '../redux/store'


function HomePage() {
  let { id } = useParams()

  const [loading, setLoading] = useState(true)
  const mobileDisplayComponent = useSelector(
    (state: RootState) => state.app.conversationView
  )

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const dispatch = useDispatch()

  const fetchUserConversations = async () => {
    try {
      setLoading(true)
      const conversations = await getUserConversationsAPI()
      dispatch(setConversations(conversations))

      if (id) {
        const conversation = await getConversationByIdAPI(+id)
        //todo check if data is empty

        dispatch(setSelectedConversation(conversation))

        dispatch(setConversationView('chat'))
      } else {
        //TODO: check if data is empty
        dispatch(setSelectedConversation(conversations[0]))
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [screenWidth])

  useEffect(() => {
    fetchUserConversations()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {screenWidth < 768 ? (
        <>
          {mobileDisplayComponent === 'messages' ? (
            <MobileMessages />
          ) : (
            <MobileChat />
          )}
        </>
      ) : (
        <Desktop />
      )}
    </>
  )
}

export default HomePage
