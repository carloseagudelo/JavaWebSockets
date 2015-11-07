/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.pizarronvirtual;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author agude
 */
@ServerEndpoint("/pizarraendpoint")
public class Pizarra {
    
    //Variable para almacenar la session de los usuarios
    //debe de ser estatica
    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public void onMessage(String message, Session peer) throws IOException {
        System.out.println("Se ha recibido un mensaje "+ message);
        
        for(Session p:peers){
            if(p != peer){
                p.getBasicRemote().sendText(message);
            }
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
    
}
