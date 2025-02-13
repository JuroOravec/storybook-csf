from storybook_csf import ComponentAnnotations, ProjectAnnotations, StoryAnnotations


def test_types():
    # fmt: off
    _component_data: ComponentAnnotations = {  # noqa: F841
        "title": "Component",
        "parameters": {
            "options": {"component": "my_widget"}
        },
        # `stories` field is specific to Storybook for Server
        # See https://github.com/storybookjs/storybook/tree/next/code/frameworks/server-webpack5
        "stories": [
            {
                "name": "Default",
                "parameters": {
                    "server": {"id": "path/of/your/story"},  # noqa: E501
                },
            }
        ],
    }
    # fmt: on

    # fmt: off
    _project_data: ProjectAnnotations = {  # noqa: F841
        # This raises a mypy error
        "components": [1, 2, 3],  # type: ignore[typeddict-unknown-key]

        "globals": {
            "background": "red",
        },
        "argTypes": {
            "background": {
                "control": {
                    "type": "date",
                },
            },
        },
        "args": {
            "background": "red",
        },
    }
    # fmt: on

    # fmt: off
    _story_data: StoryAnnotations = {  # noqa: F841
        "name": "Default",
        "parameters": {
            "server": {"id": "path/of/your/story"}
        }
    }
    # fmt: on
