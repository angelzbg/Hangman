package hangman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hangman")
public class HangmanApi {
	
	@Autowired
	private HangmanService hangmanService;

	@PostMapping("/games")
	public GameDetails startNewGame() {
		System.out.println("Started new game");
		return hangmanService.startNewGame();
	}
	
	@GetMapping("/games/{gameId}")
	public GameDetails getGameDetails(@PathVariable String gameId) {
		return hangmanService.getGameDetails(gameId);
	}
	
	@PostMapping("/games/{gameId}/try")
	public GameDetails getGameDetails(@PathVariable String gameId, String character) {
		if(character == null) return hangmanService.getGameDetails(gameId);
		return hangmanService.getGameDetails(gameId, character);
	}
}
