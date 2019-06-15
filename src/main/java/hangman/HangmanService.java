package hangman;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class HangmanService {
	private AtomicInteger nextGameId = new AtomicInteger();
	
	@Value("${dictionary}")
	private List<String> dictionary;
	
	private Map<String, GameDetails> games = new ConcurrentHashMap<>();

	public GameDetails startNewGame() {
		Random random = new Random();
		int index = random.nextInt(dictionary.size());
		String word = dictionary.get(index);
		String gameId = String.valueOf(nextGameId.getAndIncrement());
		GameDetails game = new GameDetails();
		game.setId(gameId);
		game.setCharCount(word.length());
		game.setFirstChar(word.charAt(0));
		game.setLastChar(word.charAt(word.length() - 1));
		StringBuilder current = new StringBuilder(word);
		game.setCurrent(current.toString());
		
		String filler = "";
		for(int i=0; i<word.length()-2; i++) {
			filler+="*";
		}
		game.setWordState(word.charAt(0) + filler + word.charAt(word.length() - 1));
		
		games.put(gameId, game);
		return game;
	}
	
	public GameDetails getGameDetails(String gameId) {
		return games.get(gameId);
	}
	
	public GameDetails getGameDetails(String gameId, String character) {
		
		GameDetails currentGame = games.get(gameId);
		
		if(currentGame.tries >= currentGame.maxTries || currentGame.current.equals(currentGame.wordState)) {
			return currentGame;
		}
		
		char realChar = character.toLowerCase().charAt(0);
		
		String current_word = currentGame.current;
		
		boolean check = false;
		for(int i=1; i<current_word.length()-1; i++) {
			if(current_word.charAt(i) == realChar) {
				check = true;
				StringBuilder newWordState = new StringBuilder(currentGame.wordState);
				newWordState.setCharAt(i, realChar);
				currentGame.wordState = newWordState.toString();
			}
		}
		
		if(!check) {
			currentGame.setTries(++currentGame.tries);
		}
		
		return currentGame;
	}
}
