class Card: CustomStringConvertible, Hashable {
    var val: String
    var sym: String

    var points: Int

    let valToPoints: Dictionary<String, Int> = [
        "J": 2,
        "Q": 3,
        "K": 4,
        "A": 11
    ]

    init(val: String, sym: String) {
        self.val = val
        self.sym = sym

        if let pts = valToPoints[val] {
            points = pts
        } else {
            points = Int(val)!
        }
    }

    var description: String {
        return self.val + self.sym
    }

    static func ==(lhs: Card, rhs: Card) -> Bool {
        return lhs.val == rhs.val && lhs.sym == rhs.sym
    }

    static func +(lhs: Int, rhs: Card) -> Int {
        return lhs + rhs.points
    }

    func hash(into hasher: inout Hasher) {
        hasher.combine(val)
        hasher.combine(sym)
    }
}

var mainStack: Set<Card> = []

let symbols: [String] = ["♠", "♣", "♥", "♦"]
let values : [String] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

for symbol in symbols {
    for value in values {
        mainStack.insert(Card(val: value, sym: symbol))
    }
}

enum States: Int {
    case play
    case pass
    case win
    case loose
    case undefined
}

class Player {
    var cards: Set<Card> = []
    var points: Int = 0

    var onlyAce: Bool = true

    func addCard(card: Card) -> States {
        self.cards.insert(card)
        self.points = self.points + card

        if self.onlyAce && card.sym != "A" {
            self.onlyAce = false
        } 
        
        if self.onlyAce && self.points == 22 {
            return States.win
        }
        
        if self.points < 21 {
            return States.play
        }
        if self.points == 21 {
            return States.win
        }

        return States.loose
    }

    func turn(deck: inout Set<Card>) -> States {
        return States.undefined
    }
}

class User: Player {
    override func turn(deck: inout Set<Card>) -> States {
        print("\nTwoje karty: ")
        print(self.cards)
        print("Masz \(self.points)/21 punktów.")
        print("\nDobierać? [T/N]: ")

        let input = readLine()!

        if input == "T" {
            let card = deck.randomElement()!
            deck.remove(card)

            print("Twoja karta to \(card) (\(card.points)pkt).\n")

            return self.addCard(card: card)
        }

        print("Pass...")
        return States.pass
    }
}

class Computer: Player {
    override func turn(deck: inout Set<Card>) -> States {
        print("\nKomputer:")
        print(self.cards)
        print("\(self.points)/21\n")

        var sum = 0
        for card in deck {
            sum += card.points
        }

        if Double(sum) / Double(deck.count) > Double(21 - self.points) {
            print("Pass...")
            return States.pass
        }

        let card = deck.randomElement()!
        deck.remove(card)

        print("Karta komputera to \(card) (\(card.points)pkt).\n")

        return self.addCard(card: card)
    }
}

func newGame() {
    let player   = User()
    let computer = Computer()

    var deck = mainStack

    while true {
        let state = player.turn(deck: &deck)

        switch state {
        case States.win:
            print("Wygrałeś!")
            return
        case States.loose:
            print("Przegrałeś...")
            return
        case States.pass:
            break
        default:
            continue
        }

        break
    }

    while true {
        let state = computer.turn(deck: &deck)

        switch state {
        case States.win:
            print("Przegrałeś...")
            return
        case States.loose:
            print("Wygrałeś!")
            return
        case States.pass:
            break
        default:
            continue
        }

        break
    }

    let diff = player.points - computer.points

    if diff > 0 {
        print("Wygrałeś!")
        return
    }
    if diff < 0 {
        print("Przegrałeś...")
        return
    }

    print("Remis.")
}

newGame()