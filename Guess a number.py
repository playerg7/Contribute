import random

def guess_num():
    lower_bound = 1
    upper_bound = 50
    secret_number = random.randint(lower_bound, upper_bound)
    attempts = 0
    max_attempts = 12

    print("Welcome to the Guess the Number Game!")
    print(f"Guess the number between {lower_bound} and {upper_bound} in {max_attempts} chances.")

    while attempts < max_attempts:
        try:
            guess = int(input("Take a guess: "))

            if guess < lower_bound or guess > upper_bound:
                print(f"Please guess a number between {lower_bound} and {upper_bound}.")
                continue

            attempts += 1

            if guess < secret_number:
                print("Too low! Try a higher number.")
            elif guess > secret_number:
                print("Too high! Try a lower number.")
            else:
                print(f"Congratulations! You guessed the number {secret_number} in {attempts} attempts.")
                break

            remaining_attempts = max_attempts - attempts
            if remaining_attempts > 0:
                print(f"You have {remaining_attempts} attempts remaining.")

        except ValueError:
            print("Invalid input. Please enter a valid number.")

    if attempts >= max_attempts:
        print(f"Sorry, you've reached the maximum number of attempts. The secret number was {secret_number}.")

if __name__ == "__main__":
    guess_num()
