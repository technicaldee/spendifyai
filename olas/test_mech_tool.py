from mech_client.interact import interact, ConfirmationType
import json

prompt_text = "Will the Federal Reserve impose interest rate cuts by 12 April 2024?"
tool_name = "prediction-online"


chain_config = "celo"
agent_id = 2

private_key_path = "ethereum_private_key.txt"

response = interact(
    prompt=prompt_text,
    agent_id=agent_id,
    tool=tool_name,
    chain_config=chain_config,
    confirmation_type=ConfirmationType.ON_CHAIN,
    private_key_path=private_key_path
)

print(json.dumps(response, indent=4))
print(json.dumps(json.loads(response["result"]), indent=4))
