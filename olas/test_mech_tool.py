from flask import Flask, jsonify, request
from mech_client.interact import interact, ConfirmationType
import json

app = Flask(__name__)

@app.route('/', methods=['POST'])
def get_prediction():
    try:
        data = request.get_json()
        prompt_text = data.get('prompt_text')
        agent_id = data.get('agent_id', 2)  
        tool_name = data.get('tool_name', 'openai_request') 
        chain_config = data.get('chain_config', 'celo') 
        private_key_path = data.get('private_key_path', 'ethereum_private_key.txt') 
        response = interact(
            prompt=prompt_text,
            agent_id=agent_id,
            tool=tool_name,
            chain_config=chain_config,
            confirmation_type=ConfirmationType.ON_CHAIN,
            private_key_path=private_key_path
        )

        result = json.loads(response["result"])
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
