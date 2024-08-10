import random
import json
import torch
import os
import re

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Correct path to the intents.json file
intents_file_path = r'C:\Users\Haris Khan\Documents\startup-nextjs-main\startup-nextjs-main\intents.json'
print(f"Trying to open file at: {intents_file_path}")

try:
    with open(intents_file_path, 'r') as json_data:
        intents = json.load(json_data)
except FileNotFoundError as e:
    print(f"File not found: {e}")
    print(f"Current working directory: {os.getcwd()}")
    raise

# Correct path to the data.pth file
data_file_path = r'C:\Users\Haris Khan\Documents\startup-nextjs-main\startup-nextjs-main\data.pth'
print(f"Trying to load file at: {data_file_path}")

try:
    data = torch.load(data_file_path)
except FileNotFoundError as e:
    print(f"File not found: {e}")
    print(f"Current working directory: {os.getcwd()}")
    raise

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"
user_name = None  # Global variable to store user's name

# Function to validate email format
def is_valid_email(email):
    regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return bool(re.match(regex, email))

def get_response(msg):
    global user_name  # Use global variable

    sentence = tokenize(msg)
    print("Tokenized Sentence:", sentence)  # Debugging: print the tokenized sentence
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    print(f"Tag: {tag}, Probability: {prob.item()}")  # Debugging: print the predicted tag and probability

    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                response = random.choice(intent['responses'])
                print(f"Recognized Intent: {intent['tag']}, Response: {response}")  # Debugging: print the recognized intent and response
                
                if "{name}" in response and user_name:
                    response = response.replace("{name}", user_name)

                # Handle specific intents
                if tag == "name":
                    user_name = msg.lower().replace('my name is', '').replace('i am', '').replace('you can call me', '').replace('this is', '').replace('i\'m', '').strip()
                    response = response.replace("{name}", user_name)
                elif tag == "email":
                    email = msg.lower().replace('my email is', '').replace('email:', '').replace('email is', '').replace('sure, email is', '').replace('sure, it\'s', '').replace('here is my email', '').replace('you can contact me at', '').replace('reach me at', '').replace('my email address is', '').strip()
                    if not is_valid_email(email):
                        return "Please provide a valid email address."
                elif tag == "service":
                    service = msg.lower().replace('i need', '').replace('i want', '').replace('can i get', '').replace('i\'d like', '').replace('service:', '').replace('i am looking for', '').replace('i require', '').replace('i\'m interested in', '').replace('can you provide', '').replace('i would like', '').strip()
                    response = response.replace("{service}", service)
                elif tag == "features":
                    features = msg.lower().replace('i need features', '').replace('features:', '').replace('i\'d like features', '').replace('can you include', '').replace('i\'d need', '').replace('i require', '').replace('please include', '').replace('i\'m looking for', '').replace('i want', '').strip()
                    response = response.replace("{features}", features)
                elif tag == "time_limit":
                    time_limit = msg.lower().replace('time limit is', '').replace('i need it in', '').replace('can you complete in', '').replace('i\'d like it done in', '').replace('the deadline is', '').replace('i can give you', '').replace('you have', '').replace('i expect it in', '').replace('complete it within', '').strip()
                    try:
                        days = int(time_limit.split()[0])
                        if days < 3:
                            return "Please provide a time limit of at least 3 days."
                        response = response.replace("{time_limit}", str(days))
                    except ValueError:
                        return "I didn't understand the time limit. Please provide the time in days."

                return response

    return "I do not understand..."

if __name__ == "_main_":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)