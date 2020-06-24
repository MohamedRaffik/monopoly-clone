from setuptools import setup, find_packages

setup(
    name='monopoly-clone',
    version='1.0.0',
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'monopoly-clone-start = app.manage:app',
            'monopoly-clone-server = app.manage:server',
            'monopoly-clone-webapp = app.manage:webapp'
        ]
    },
    scripts=[],
    install_requires=[
        'starlette[full]',
        'uvicorn',
        'google-cloud-pubsub',
        'python-dotenv'
    ]
)